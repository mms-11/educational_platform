import { useState, useEffect } from 'react';
import { studentService } from '@/services/student.service';
import { classService } from '@/services/class.service'; // ← ADICIONE ISSO
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Table } from '@/components/ui/Table';
import type { Student, CreateStudentDto } from '@/types';
import type { Class } from '@/types'; // ← ADICIONE ISSO

const StudentsPage = () => {
  // Estados
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<Class[]>([]); // ← ADICIONE ISSO
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  // Form states - ADICIONE classId
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    classId: '', // ← ADICIONE ISSO
    status: 'active' as 'active' | 'inactive',
  });

  // Carregar turmas ← ADICIONE ISSO
  const loadClasses = async () => {
    try {
      const data = await classService.getAll();
      setClasses(data);
    } catch (error) {
      console.error('Erro ao carregar turmas:', error);
    }
  };

  // Carregar alunos
  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAll({ search });
      setStudents(data);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
      alert('Erro ao carregar alunos');
    } finally {
      setLoading(false);
    }
  };

  // Carregar ao montar e quando search mudar
  useEffect(() => {
    loadStudents();
    loadClasses(); // ← ADICIONE ISSO
  }, [search]);

  // Abrir modal para criar
  const handleCreate = () => {
    setEditingStudent(null);
    setFormData({ name: '', email: '', classId: '', status: 'active' }); // ← ATUALIZE
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      classId: student.classId, // ← ADICIONE ISSO
      status: student.status,
    });
    setIsModalOpen(true);
  };

  // Salvar (criar ou editar)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação ← ADICIONE ISSO
    if (!formData.classId) {
      alert('Por favor, selecione uma turma');
      return;
    }
    
    try {
      console.log('Salvando aluno:', formData); // DEBUG
      
      if (editingStudent) {
        // Editar
        await studentService.update(editingStudent.id, formData);
        alert('Aluno atualizado com sucesso!');
      } else {
        // Criar
        await studentService.create(formData as CreateStudentDto);
        alert('Aluno criado com sucesso!');
      }
      
      setIsModalOpen(false);
      loadStudents();
    } catch (error: any) {
      console.error('Erro completo:', error);
      console.error('Resposta do servidor:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
      alert(`Erro ao salvar aluno: ${errorMessage}`);
    }
  };

  // Deletar
  const handleDelete = async (student: Student) => {
    if (!confirm(`Tem certeza que deseja excluir ${student.name}?`)) {
      return;
    }

    try {
      await studentService.delete(student.id);
      alert('Aluno excluído com sucesso!');
      loadStudents();
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
      alert('Erro ao excluir aluno');
    }
  };

  // Colunas da tabela - ADICIONE TURMA
  const columns = [
    {
      key: 'name',
      header: 'Nome',
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'className', // ← ADICIONE ISSO
      header: 'Turma',
      render: (student: Student) => student.className || 'Sem turma',
    },
    {
      key: 'status',
      header: 'Status',
      render: (student: Student) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            student.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {student.status === 'active' ? 'Ativo' : 'Inativo'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Ações',
      render: (student: Student) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(student);
            }}
          >
            Editar
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(student);
            }}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gerenciamento de Alunos
        </h1>
        <p className="text-gray-600">
          Gerencie os alunos cadastrados no sistema
        </p>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:w-96">
          <Input
            type="search"
            placeholder="Buscar por nome ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button onClick={handleCreate}>
          + Novo Aluno
        </Button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">Carregando...</p>
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="bg-white rounded-lg shadow">
          <Table data={students} columns={columns} />
        </div>
      )}

      {/* Modal - ADICIONE CAMPO TURMA */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingStudent ? 'Editar Aluno' : 'Novo Aluno'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Nome"
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <Input
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/* ← ADICIONE ESTE CAMPO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Turma <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.classId}
              onChange={(e) =>
                setFormData({ ...formData, classId: e.target.value })
              }
              required
            >
              <option value="">Selecione uma turma</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'active' | 'inactive',
                })
              }
            >
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {editingStudent ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentsPage;
