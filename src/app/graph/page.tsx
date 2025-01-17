import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeTypes,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import React, { useCallback, useState } from 'react';


import SidePanel from '@/components/SidePanel';
import HabitNode from '@/nodes/HabitNode';
import UserNode from '@/nodes/UserNode';
import { setHabit, setUsername } from '@/store/nodeSlice';
import '@xyflow/react/dist/style.css';
import { useDispatch } from 'react-redux';

const nodeTypes = {
  userNode: UserNode,
  habitNode: HabitNode,
};

export default function MainNodeFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [lastNodeId, setLastNodeId] = useState<string | null>(null);

  const dispatch = useDispatch();

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleAddNode = (type: 'userNode' | 'habitNode', properties: Record<string, string>) => {
    const id = `${nodes.length + 1}`;
    const newNode: Node = {
      id,
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: properties,
    };

    if (type === 'userNode')
      dispatch(setUsername({ id, username: properties.username || '' }));
    else if (type === 'habitNode')
      dispatch(setHabit({ id, habit: properties.habit || '' }));

    console.log('Adding node:', newNode);

    setNodes((nds) => [...nds, newNode]);

    console.log(nodes);

    if (lastNodeId) {
      const newEdge: Edge = {
        id: `e${lastNodeId}-${id}`,
        source: lastNodeId,
        target: id,
      };
      setEdges((eds) => [...eds, newEdge]);
    }

    setLastNodeId(id);
  };

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const handleDeselectNode = () => {
    setSelectedNode(null);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <SidePanel
        selectedNodeId={selectedNode?.id || null}
        selectedNodeType={selectedNode?.type as 'userNode' | 'habitNode' | null}
        onAddNode={handleAddNode}
        onDeselectNode={handleDeselectNode}
      />
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes as NodeTypes}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}