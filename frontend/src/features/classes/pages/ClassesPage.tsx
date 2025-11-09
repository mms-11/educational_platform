import { useState, useEffect } from 'react';
import { classService } from '@/services/class.service';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Table } from '@/components/ui/Table';
import type { Class, CreateClassDto } from '@/types';

const ClassesPage = () => {
  // Estados
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    capacity: 30,
    schedule: '',
    status: 'active' as 'active' | 'inactive',
  });

  // Carregar turmas
  const loadClasses = async () => {
    try {
      setLoading(true);
      const data = await classService.getAll({ search });
      setClasses(data);
    } catch (error) {
      console.error('Erro ao carregar turmas:', error);
      alert('Erro ao carregar turmas');
    } finally {
      setLoading(false);
    }
  };

  // Carregar ao montar e quando search mudar
  useEffect(() => {
    loadClasses();
  }, [search]);

  // Abrir modal para criar
  const handleCreate = () => {
    setEditingClass(null);
    setFormData({ name: '', capacity: 30, schedule: '', status: 'active' });
    setIsModalOpen(true);
  };

  // Abrir modal para editar
  const handleEdit = (cls: Class) => {
    setEditingClass(cls);
    setFormData({
      name: cls.name,
      capacity: cls.capacity,
      schedule: cls.schedule || '',
      status: cls.status,
    });
    setIsModalOpen(true);
  };

  // Salvar (criar ou editar)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || formData.capacity <= 0) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    try {
      console.log('Salvando turma:', formData);
      
      if (editingClass) {
        // Editar
        await classService.update(editingClass.id, formData);
        alert('Turma atualizada com sucesso!');
      } else {
        // Criar
        await classService.create(formData as CreateClassDto);
        alert('Turma criada com sucesso!');
      }
      
      setIsModalOpen(false);
      loadClasses();
    } catch (error: any) {
      console.error('Erro completo:', error);
      console.error('Resposta do servidor:', error.response?.data);
      
      const errorMessage = error.response?.data?.message || error.message || 'Erro desconhecido';
      alert(`Erro ao salvar turma: ${errorMessage}`);
    }
  };

  // Deletar
  const handleDelete = async (cls: Class) => {
    if (!confirm(`Tem certeza que deseja excluir a turma "${cls.name}"?`)) {
      return;
    }

    try {
      await classService.delete(cls.id);
      alert('Turma excluída com sucesso!');
      loadClasses();
    } catch (error) {
      console.error('Erro ao excluir turma:', error);
      alert('Erro ao excluir turma');
    }
  };

  // Calcular porcentagem de ocupação
  const getOccupancyPercentage = (cls: Class) => {
    return Math.round((cls.currentStudents / cls.capacity) * 100);
  };

  // Cor da ocupação
  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  // Colunas da tabela
  const columns = [
    {
      key: 'name',
      header: 'Nome da Turma',
    },
    {
      key: 'occupancy',
      header: 'Ocupação',
      render: (cls: Class) => {
        const percentage = getOccupancyPercentage(cls);
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {cls.currentStudents}/{cls.capacity}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getOccupancyColor(percentage)}`}>
              {percentage}%
            </span>
          </div>
        );
      },
    },
    {
      key: 'schedule',
      header: 'Horário',
      render: (cls: Class) => cls.schedule || 'Não definido',
    },
    {
      key: 'status',
      header: 'Status',
      render: (cls: Class) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            cls.status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {cls.status === 'active' ? 'Ativa' : 'Inativa'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Ações',
      render: (cls: Class) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(cls);
            }}
          >
            Editar
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(cls);
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
          Gerenciamento de Turmas
        </h1>
        <p className="text-gray-600">
          Gerencie as turmas cadastradas no sistema
        </p>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:w-96">
          <Input
            type="search"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button onClick={handleCreate}>
          + Nova Turma
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600 mb-1">Total de Turmas</h3>
          <p className="text-3xl font-bold text-gray-900">{classes.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600 mb-1">Turmas Ativas</h3>
          <p className="text-3xl font-bold text-green-600">
            {classes.filter(c => c.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-600 mb-1">Total de Alunos</h3>
          <p className="text-3xl font-bold text-blue-600">
            {classes.reduce((sum, c) => sum + c.currentStudents, 0)}
          </p>
        </div>
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
          <Table data={classes} columns={columns} />
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingClass ? 'Editar Turma' : 'Nova Turma'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Nome da Turma"
            type="text"
            required
            placeholder="Ex: Turma A - Manhã"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <Input
            label="Capacidade"
            type="number"
            required
            min="1"
            placeholder="Ex: 30"
            value={formData.capacity}
            onChange={(e) =>
              setFormData({ ...formData, capacity: Number(e.target.value) })
            }
          />

          <Input
            label="Horário"
            type="text"
            placeholder="Ex: Segunda a Sexta - 08:00 às 12:00"
            value={formData.schedule}
            onChange={(e) =>
              setFormData({ ...formData, schedule: e.target.value })
            }
          />

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
              <option value="active">Ativa</option>
              <option value="inactive">Inativa</option>
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
              {editingClass ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ClassesPage;
