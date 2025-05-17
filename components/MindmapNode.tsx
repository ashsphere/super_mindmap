import { useState } from 'react';

export type MindmapNodeData = {
  id: string;
  title: string;
  children: MindmapNodeData[];
};

export default function MindmapNode({ node, onChange }: {
  node: MindmapNodeData;
  onChange: (updated: MindmapNodeData) => void;
}) {
  const [title, setTitle] = useState(node.title);

  const handleAddChild = () => {
    const child: MindmapNodeData = {
      id: Math.random().toString(36).slice(2),
      title: 'New Node',
      children: [],
    };
    const updated = { ...node, children: [...node.children, child] };
    onChange(updated);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onChange({ ...node, title: e.target.value });
  };

  const handleChildChange = (idx: number, child: MindmapNodeData) => {
    const updatedChildren = [...node.children];
    updatedChildren[idx] = child;
    onChange({ ...node, children: updatedChildren });
  };

  return (
    <div style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
      <input value={title} onChange={handleTitleChange} style={{ fontWeight: 'bold' }} />
      <button onClick={handleAddChild} style={{ marginLeft: '0.5rem' }}>+</button>
      <div>
        {node.children.map((child, i) => (
          <MindmapNode key={child.id} node={child} onChange={(c) => handleChildChange(i, c)} />
        ))}
      </div>
    </div>
  );
}
