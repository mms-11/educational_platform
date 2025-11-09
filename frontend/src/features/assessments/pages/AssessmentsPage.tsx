import { useState, useEffect } from 'react';
import { assessmentService } from '@/services/assessment.service';
import { classService } from '@/services/class.service';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import type { Assessment, AssessmentCriteria, CreateAssessmentDto, Class } from '@/types';

const AssessmentsPage = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null);

  const [formData, setFormData] = useState({
    classId: '',
    title: '',
    description: '',
    date: '',
    status: 'pending' as 'pending' | 'completed' | 'cancelled',
  });

  const [criteria, setCriteria] = useState<(Omit<AssessmentCriteria, 'id'> | AssessmentCriteria)[]>(
    [
      { name: 'Prova', weight: 40 },
      { name: 'Trabalho', weight: 30 },
      { name: 'Participação', weight: 30 },
    ]
  );

  // Calcular peso total
  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
  const isWeightValid = totalWeight === 100;

  const loadClasses = async () => {
    try {
      const data = await classService.getAll();
      setClasses(data);
    } catch (error) {
      console.error('Erro ao carregar turmas:', error);
    }
  };

  const loadAssessments = async () => {
    try {
      setLoading(true);
      const filters = selectedClassId ? { classId: selectedClassId } : undefined;
      const data = await assessmentService.getAll(filters);
      setAssessments(data);
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
      alert('Erro ao carregar avaliações');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClasses();
    loadAssessments();
  }, [selectedClassId]);

  const handleCreate = () => {
    setEditingAssessment(null);
    setFormData({
      classId: '',
      title: '',
      description: '',
      date: '',
      status: 'pending',
    });
    setCriteria([
      { name: 'Prova', weight: 40 },
      { name: 'Trabalho', weight: 30 },
      { name: 'Participação', weight: 30 },
    ]);
    setIsModalOpen(true);
  };

  const handleEdit = (assessment: Assessment) => {
    setEditingAssessment(assessment);
    setFormData({
      classId: assessment.classId,
      title: assessment.title,
      description: assessment.description,
      date: assessment.date.split('T')[0],
      status: assessment.status,
    });
    setCriteria(assessment.criteria);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isWeightValid) {
      alert(`A soma dos pesos deve ser 100%. Atual: ${totalWeight}%`);
      return;
    }

    if (!formData.classId || !formData.title || criteria.length === 0) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const selectedClass = classes.find(c => c.id === formData.classId);

      if (editingAssessment) {
        const updatePayload = {
          ...formData,
          className: selectedClass?.name || '',
          criteria: criteria.filter((c): c is AssessmentCriteria => 'id' in c && !!c.id),
        };
        await assessmentService.update(editingAssessment.id, updatePayload);
        alert('Avaliação atualizada com sucesso!');
      } else {
        const createPayload: CreateAssessmentDto = {
          ...formData,
          className: selectedClass?.name || '',
          criteria,
        };
        await assessmentService.create(createPayload);
        alert('Avaliação criada com sucesso!');
      }

      setIsModalOpen(false);
      loadAssessments();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message;
      alert(`Erro ao salvar avaliação: ${errorMessage}`);
    }
  };

  const handleDelete = async (assessment: Assessment) => {
    if (!confirm(`Excluir "${assessment.title}"?`)) return;

    try {
      await assessmentService.delete(assessment.id);
      alert('Avaliação excluída!');
      loadAssessments();
    } catch (error) {
      alert('Erro ao excluir avaliação');
    }
  };

  const addCriterion = () => {
    setCriteria([...criteria, { name: '', weight: 0 }]);
  };

  const updateCriterion = (index: number, field: 'name' | 'weight', value: string | number) => {
    const newCriteria = [...criteria];
    newCriteria[index] = { ...newCriteria[index], [field]: value };
    setCriteria(newCriteria);
  };

  const removeCriterion = (index: number) => {
    setCriteria(criteria.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Avaliações</h1>
        <p className="text-gray-600">Configure critérios de avaliação por turma</p>
      </div>

      <div className="mb-6 flex gap-4">
        <select
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
        >
          <option value="">Todas as turmas</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>
        <Button onClick={handleCreate}>+ Nova Avaliação</Button>
      </div>

      {loading ? (
        <p className="text-center py-8">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{assessment.title}</h3>
                  <p className="text-sm text-gray-600">{assessment.className}</p>
                  <p className="text-sm text-gray-500">{new Date(assessment.date).toLocaleDateString()}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs ${
                  assessment.status === 'completed' ? 'bg-green-100 text-green-800' :
                  assessment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {assessment.status === 'completed' ? 'Concluída' :
                   assessment.status === 'cancelled' ? 'Cancelada' : 'Pendente'}
                </span>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Critérios:</h4>
                {assessment.criteria.map((criterion) => (
                  <div key={criterion.id} className="flex justify-between text-sm mb-1">
                    <span>{criterion.name}</span>
                    <span className="font-semibold">{criterion.weight}%</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => handleEdit(assessment)}>
                  Editar
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(assessment)}>
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAssessment ? 'Editar Avaliação' : 'Nova Avaliação'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Turma *</label>
            <select
              className="w-full px-3 py-2 border rounded-lg"
              value={formData.classId}
              onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
              required
            >
              <option value="">Selecione</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>

          <Input
            label="Título *"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />

          <Input
            label="Descrição"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Input
            label="Data"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                Critérios de Avaliação *
              </label>
              <span className={`text-sm font-bold ${isWeightValid ? 'text-green-600' : 'text-red-600'}`}>
                Total: {totalWeight}%
              </span>
            </div>

            {criteria.map((criterion, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder="Nome do critério"
                  value={criterion.name}
                  onChange={(e) => updateCriterion(index, 'name', e.target.value)}
                  required
                />
                <Input
                  type="number"
                  placeholder="Peso %"
                  min="0"
                  max="100"
                  value={criterion.weight}
                  onChange={(e) => updateCriterion(index, 'weight', Number(e.target.value))}
                  required
                  className="w-24"
                />
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => removeCriterion(index)}
                  disabled={criteria.length === 1}
                >
                  ✕
                </Button>
              </div>
            ))}

            <Button type="button" variant="secondary" size="sm" onClick={addCriterion}>
              + Adicionar Critério
            </Button>

            {!isWeightValid && (
              <p className="text-red-600 text-sm mt-2">
                ⚠️ A soma dos pesos deve ser exatamente 100%
              </p>
            )}
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!isWeightValid}>
              {editingAssessment ? 'Atualizar' : 'Criar'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AssessmentsPage;
