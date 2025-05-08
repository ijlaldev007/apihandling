import { useState } from "react";
import {
  useHierarchicalData,
  useHierarchicalNodeChildren,
  useHierarchicalNodePath,
} from "@/hooks/useHierarchicalData";
import { Button } from "@/components/ui/button";
import type { HierarchicalNode } from "@/types/hierarchical";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export default function HierarchicalPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Fetch data using our hooks
  const { data: rootData, isLoading: isRootLoading } = useHierarchicalData();
  const { data: children } = useHierarchicalNodeChildren(selectedNodeId);
  const { data: pathNodes } = useHierarchicalNodePath(selectedNodeId);

  // Handle node expansion toggle
  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  // Handle navigation back
  const handleNavigateUp = () => {
    if (pathNodes && pathNodes.length > 1) {
      setSelectedNodeId(pathNodes[pathNodes.length - 2].id);
    } else {
      setSelectedNodeId(null);
    }
  };

  const renderNode = (node: HierarchicalNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);

    return (
      <div key={node.id} className="relative" style={{ paddingLeft: `${level * 40}px` }}>
        <div className={cn(
          "flex items-center gap-2 p-2 rounded-lg border mb-1 hover:bg-accent",
          level > 0 && "relative before:absolute before:left-[-24px] before:top-1/2 before:w-6 before:h-px before:bg-border"
        )}>
          {hasChildren && (
            <Button
              variant="ghost"
              size="sm"
              className="size-6 p-0"
              onClick={() => toggleNode(node.id)}
            >
              <ChevronRight className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-90"
              )} />
            </Button>
          )}
          <div className="flex-1">
            <div className="font-medium">{node.name}</div>
            {node.role && (
              <div className="text-sm text-muted-foreground">{node.role}</div>
            )}
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div className="relative before:absolute before:left-[11px] before:top-0 before:bottom-4 before:w-px before:bg-border">
            {node.children?.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (isRootLoading || !rootData) {
    return <div>Loading...</div>;
  }

  const currentNodes = selectedNodeId ? children : [rootData];

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Organization Chart</h1>

      {/* Breadcrumb */}
      {pathNodes && (
        <div className="mb-4 flex items-center gap-2">
          {pathNodes.map((node, index) => (
            <span key={node.id} className="flex items-center">
              <Button variant="ghost" onClick={() => setSelectedNodeId(node.id)}>
                {node.name}
              </Button>
              {index < pathNodes.length - 1 && <span>/</span>}
            </span>
          ))}
        </div>
      )}

      {selectedNodeId && (
        <Button onClick={handleNavigateUp} variant="outline" className="mb-4">
          ← Back
        </Button>
      )}

      <div className="rounded-lg border bg-card p-6">
        {currentNodes?.filter(Boolean).map(node => renderNode(node))}
      </div>
    </div>
  );
}
