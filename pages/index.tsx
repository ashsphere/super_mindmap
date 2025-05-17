import { useEffect, useState } from 'react';
import MindmapNode, { MindmapNodeData } from '../components/MindmapNode';
import { supabase } from '../lib/supabaseClient';

const TABLE_NAME = 'sum_mindmaps';

export default function Home() {
  const [map, setMap] = useState<MindmapNodeData | null>(null);

  useEffect(() => {
    const fetchMap = async () => {
      const { data } = await supabase.from(TABLE_NAME).select('map').single();
      if (data) setMap(data.map as MindmapNodeData);
      else
        setMap({ id: 'root', title: 'Root', children: [] });
    };
    fetchMap();
  }, []);

  useEffect(() => {
    if (!map) return;
    const timer = setTimeout(async () => {
      await supabase.from(TABLE_NAME).upsert({ id: 1, map });
    }, 1000);
    return () => clearTimeout(timer);
  }, [map]);

  const handleChange = (node: MindmapNodeData) => setMap(node);

  if (!map) return <div>Loading...</div>;

  return (
    <div>
      <h1>Mindmap</h1>
      <MindmapNode node={map} onChange={handleChange} />
    </div>
  );
}
