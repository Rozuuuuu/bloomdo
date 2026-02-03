import React from 'react'; // Remove useState import
import { useNavigate } from 'react-router-dom';
import DependencyMap from '../components/dependencies/DependencyMap';
import { useTodoStore } from '../store/todoStore';

const DependencyPage: React.FC = () => {
  const navigate = useNavigate();
  const { tasks } = useTodoStore();
  
  // Convert tasks to dependency nodes
  const dependencies = tasks.map((task, index) => {
    const positions = [
      { x: 40, y: 80 },   // Top-left
      { x: 190, y: 260 }, // Center-top
      { x: 40, y: 460 },  // Bottom-left
      { x: 340, y: 480 }, // Bottom-right
    ];
    
    // Fix: Ensure status matches the exact type
    let status: 'completed' | 'active' | 'locked' | 'scheduled' = 'scheduled';
    if (task.completed) {
      status = 'completed';
    } else if (task.priority === 'high') {
      status = 'active';
    } else {
      status = 'scheduled';
    }
    
    return {
      id: task.id,
      title: task.title,
      status,
      position: positions[index] || { x: 100 + (index % 3) * 120, y: 100 + Math.floor(index / 3) * 180 },
      dependencies: task.dependencies || [],
    };
  });

  const handleNodeClick = (nodeId: string) => {
    navigate(`/edit-task/${nodeId}`);
  };

  return <DependencyMap dependencies={dependencies} onNodeClick={handleNodeClick} />;
};

export default DependencyPage;