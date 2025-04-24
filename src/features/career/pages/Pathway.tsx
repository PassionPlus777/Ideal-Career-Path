import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useAnalytics } from "../../../core/hooks/useAnalytics";
import ModalContent from "../../../shared/components/layout/ModalContent";

interface NodeData {
  id: string;
  name: string;
  group: number;
  children?: NodeData[];
}

// Modal component
const NodeModal: React.FC<{
  node: NodeData | null;
  onClose: () => void;
}> = ({ node, onClose }) => {
  if (!node) return null;

  const howItWorks = [
    {
      text: "The app uses Bluetooth to exchange random codes with nearby phones.",
      checked: true,
    },
    {
      text: "Every day, it checks a list of random codes from people who tell the app they tested positive.",
      checked: true,
    },
    {
      text: "If you've had close contact with one of those people in the past 14 days, you'll get a notification.",
      checked: true,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 overflow-y-auto pt-40"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-lg w-full my-8 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContent
          imageUrl="/splash/learn.png"
          leftButtonText="Back"
          rightButtonText="Next"
          onLeftButtonClick={onClose}
          onRightButtonClick={onClose}
          onClose={onClose}
        >
          <div className="px-6 pb-16">
            <h2 className="text-[28px] font-bold mb-6 leading-tight">
              How it works
            </h2>
            <div className="space-y-5">
              {howItWorks.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 text-[#4CD964] flex items-center justify-center text-xl font-bold">
                      ✓
                    </div>
                  </div>
                  <p className="text-[17px] leading-[1.3] text-gray-900">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() => {}}
                className="w-full py-3 px-4 bg-gray-100 rounded-xl text-[17px] font-medium text-gray-900 flex items-center justify-between hover:bg-gray-200 transition-colors"
              >
                Learn more about how it works
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </ModalContent>
      </div>
    </div>
  );
};

function isDescendant(
  node: d3.HierarchyNode<NodeData>,
  ancestor: d3.HierarchyNode<NodeData>
): boolean {
  let current = node;
  while (current.parent) {
    if (current.parent === ancestor) {
      return true;
    }
    current = current.parent;
  }
  return false;
}

// In the future, this data will come from the backend
const healthCareerData: NodeData = {
  id: "root",
  name: "Health",
  group: 0,
  children: [
    {
      id: "physician",
      name: "Physician",
      group: 1,
      children: [
        {
          id: "mental",
          name: "Mental",
          group: 2,
          children: [
            {
              id: "psychiatrist",
              name: "Psychiatrist",
              group: 3,
            },
            {
              id: "psychologist",
              name: "Psychologist",
              group: 3,
            },
            {
              id: "therapist",
              name: "Therapist",
              group: 3,
            },
          ],
        },
        {
          id: "physical",
          name: "Physical",
          group: 2,
          children: [
            {
              id: "dentist",
              name: "Dentist",
              group: 3,
              children: [
                {
                  id: "orthodontist",
                  name: "Orthodontist",
                  group: 4,
                },
              ],
            },
            {
              id: "paramedic",
              name: "Paramedic",
              group: 3,
            },
            {
              id: "general-practitioner",
              name: "General Practitioner",
              group: 3,
            },
          ],
        },
      ],
    },
    {
      id: "nurse",
      name: "Nurse",
      group: 1,
      children: [
        {
          id: "natal",
          name: "Natal",
          group: 2,
          children: [
            {
              id: "pediatrician",
              name: "Pediatrician",
              group: 3,
            },
            {
              id: "obgyn",
              name: "OB-GYN",
              group: 3,
            },
            {
              id: "doula",
              name: "Doula",
              group: 3,
            },
          ],
        },
        {
          id: "geriatric",
          name: "Geriatric",
          group: 2,
        },
        {
          id: "er-nurse",
          name: "ER Nurse",
          group: 2,
        },
        {
          id: "cardiac-nurse",
          name: "Cardiac Nurse",
          group: 2,
        },
      ],
    },
    {
      id: "research",
      name: "Research & Development",
      group: 1,
    },
    {
      id: "technical",
      name: "Technical",
      group: 1,
      children: [
        {
          id: "pharmacist",
          name: "Pharmacist",
          group: 2,
        },
        {
          id: "medical-record",
          name: "Medical Record Technician",
          group: 2,
        },
        {
          id: "lab-tech",
          name: "Lab Technician",
          group: 2,
        },
      ],
    },
  ],
};

const Pathway: React.FC = () => {
  const { trackScreenView } = useAnalytics();
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNodeData, setSelectedNodeData] = useState<NodeData | null>(
    null
  );
  const selectedNodeRef = useRef<SVGGElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const initialTransformRef = useRef<d3.ZoomTransform | null>(null);

  useEffect(() => {
    trackScreenView("pathway");
  }, [trackScreenView]);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing content
    d3.select(svgRef.current).selectAll("*").remove();

    // Set up the SVG dimensions
    const svgElement = svgRef.current;
    const width = svgElement.clientWidth;
    const height = svgElement.clientHeight;
    const padding = 100;

    // Add zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 4])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });

    zoomRef.current = zoom;

    // Create the SVG with improved centering
    const svg = d3
      .select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // Add drop shadow filter and arrow marker
    const defs = svg.append("defs");

    // Add arrow marker definition with larger viewBox and better positioning
    defs
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "-5 -5 20 20") // Expanded viewBox to prevent clipping
      .attr("refX", 8)
      .attr("refY", 5)
      .attr("markerWidth", 12)
      .attr("markerHeight", 12)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10")
      .attr("stroke", "#1976D2")
      .attr("stroke-width", 1.5)
      .attr("fill", "none");

    const filter = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("x", "-50%")
      .attr("y", "-50%")
      .attr("width", "200%")
      .attr("height", "200%");

    filter
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "blur");

    filter
      .append("feOffset")
      .attr("in", "blur")
      .attr("dx", 3)
      .attr("dy", 3)
      .attr("result", "offsetBlur");

    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // Add background dots with enhanced style
    const numDots = 1000;
    const dots = Array.from({ length: numDots }, () => ({
      x: (Math.random() - 0.5) * window.innerWidth,
      y: (Math.random() - 0.5) * window.innerHeight,
      size: Math.random() * 3 + 1, // Random size between 1-4px
    }));

    svg
      .selectAll(".background-dot")
      .data(dots)
      .enter()
      .append("circle")
      .attr("class", "background-dot")
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("r", (d) => d.size)
      .attr("fill", "#E3F2FD")
      .attr("opacity", () => 0.3 + Math.random() * 0.3); // Random opacity

    // Create a container for the tree
    const container = svg.append("g").attr("class", "container");

    // Create the tree layout (bottom to top)
    const treeLayout = d3
      .tree<NodeData>()
      .size([width * 0.8, height * 0.8])
      .nodeSize([250, 400]) // Increase horizontal spacing between nodes
      .separation((a, b) => {
        // Increase separation between nodes based on their depth and relationship
        return a.parent === b.parent ? 1.5 : 2;
      });

    // Create the hierarchy from our data
    const root = d3.hierarchy(healthCareerData);

    // Generate the tree layout
    const treeData = treeLayout(root);

    // Flip the y coordinates to make it bottom-up
    treeData.descendants().forEach((d) => {
      d.y = -d.y;
    });

    // Create links with straight arrows
    container
      .selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", (d) => {
        // Calculate the direction vector
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const length = Math.sqrt(dx * dx + dy * dy);

        // Normalize the vector
        const nx = dx / length;
        const ny = dy / length;

        // Adjust start and end points based on node sizes
        // Move start point out from source node center by 80 units (half of node width)
        const startX = d.source.x + nx * 80;
        const startY = d.source.y + ny * 80;

        // Move end point in from target node center by 80 units
        const endX = d.target.x - nx * 80;
        const endY = d.target.y - ny * 80;

        // Use straight line with adjusted connection points
        return `M${startX},${startY} L${endX},${endY}`;
      })
      .attr("fill", "none")
      .attr("stroke", "#1976D2")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)")
      .style("filter", "url(#drop-shadow)");

    // Calculate the bounding box of the tree
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    treeData.descendants().forEach((d) => {
      minX = Math.min(minX, d.x);
      maxX = Math.max(maxX, d.x);
      minY = Math.min(minY, d.y);
      maxY = Math.max(maxY, d.y);
    });

    const treeWidth = maxX - minX;
    const treeHeight = maxY - minY;

    // Calculate the initial scale to fit the tree
    const scale = Math.max(
      0.5,
      Math.min(
        1.2,
        Math.min(
          width / (treeWidth + padding * 2),
          height / (treeHeight + padding * 2)
        )
      )
    );

    const initialTransform = d3.zoomIdentity
      .translate(
        (width - treeWidth * scale) / 2 - minX * scale,
        (height - treeHeight * scale) / 2 - minY * scale
      )
      .scale(scale);

    initialTransformRef.current = initialTransform;

    // Start with a zoomed-out view
    svg.call(zoom);
    svg.call(
      zoom.transform,
      d3.zoomIdentity
        .translate(
          (width - treeWidth * scale) / 2 - minX * scale,
          (height - treeHeight * scale) / 2 - minY * scale
        )
        .scale(0.5)
    );

    // Animate to the proper view after a short delay
    setTimeout(() => {
      svg
        .transition()
        .duration(600)
        .ease(d3.easeCubicOut)
        .call(zoom.transform, initialTransform)
        .on("end", () => {
          isInitialAnimationComplete = true;
        });
    }, 100);

    // Create nodes with enhanced style
    let selectedNode: SVGGElement | null = null;
    let isInitialAnimationComplete = false;

    const nodes = container
      .selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer")
      .on("click", function (_, d) {
        // Prevent node selection during initial animation
        if (!isInitialAnimationComplete) return;

        // If there was a previously selected node, reset its labels
        if (selectedNode && selectedNode !== this) {
          d3.select(selectedNode)
            .transition()
            .duration(300)
            .attr("transform", (d: any) => `translate(${d.x},${d.y}) scale(1)`);

          // Hide all labels
          d3.selectAll(".label-group")
            .transition()
            .duration(300)
            .style("opacity", 0);
        }

        // Update selected node reference
        selectedNode = selectedNode === this ? null : this;
        selectedNodeRef.current = selectedNode;

        if (selectedNode) {
          // Scale up selected node
          d3.select(this)
            .transition()
            .duration(300)
            .attr("transform", `translate(${d.x},${d.y}) scale(2)`);

          // Calculate zoom transform to focus on selected node
          const svg = d3.select(svgRef.current);
          const width = svg.node()?.clientWidth || 0;
          const height = svg.node()?.clientHeight || 0;

          // Check if it's a mobile screen
          const isMobile = width <= 768;

          // Calculate the scale needed to fit the selected node and its children
          const scale =
            Math.max(
              isMobile ? 0.6 : 0.4,
              Math.min(
                isMobile ? 1.0 : 0.8,
                Math.min(
                  width / (treeWidth + padding * 2),
                  height / (treeHeight + padding * 2)
                )
              )
            ) * (isMobile ? 1.0 : 0.8);

          // Calculate the transform to center on the selected node
          const transform = d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(scale)
            .translate(-d.x, -d.y);

          // Apply the transform with animation
          if (zoomRef.current) {
            svg
              .transition()
              .duration(750)
              .call(zoomRef.current.transform as any, transform)
              .on("end", () => {
                setSelectedNodeData(d.data);
              });
          }

          // Hide all labels first
          d3.selectAll(".label-group")
            .transition()
            .duration(300)
            .style("opacity", 0);

          // Then show labels for selected node and its direct children
          d3.selectAll(".label-group")
            .filter((node: any) => {
              const nodeData = node as d3.HierarchyNode<NodeData>;
              return (
                nodeData === d || // Selected node
                (nodeData.depth === d.depth + 1 && nodeData.parent === d) // Direct children only
              );
            })
            .transition()
            .duration(300)
            .style("opacity", 1);
        } else {
          // If deselecting, reset to initial view
          const svg = d3.select(svgRef.current);
          if (zoomRef.current && initialTransformRef.current) {
            svg
              .transition()
              .duration(750)
              .call(
                zoomRef.current.transform as any,
                initialTransformRef.current
              );
          }

          // Show labels for root and its direct children
          d3.selectAll(".label-group")
            .filter((node: any) => {
              const nodeData = node as d3.HierarchyNode<NodeData>;
              return nodeData.depth <= 1; // Root and its direct children
            })
            .transition()
            .duration(300)
            .style("opacity", 1);

          setSelectedNodeData(null);
        }
      });

    // First stroke (outer)
    nodes
      .append("rect")
      .attr("class", "outer-stroke")
      .attr("width", 160)
      .attr("height", 160)
      .attr("x", -80)
      .attr("y", -80)
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("fill", "none")
      .attr("stroke", "#170062")
      .attr("stroke-width", 5);

    // Second stroke (inner)
    nodes
      .append("rect")
      .attr("class", "inner-rect")
      .attr("width", 120)
      .attr("height", 120)
      .attr("x", -60)
      .attr("y", -60)
      .attr("rx", 8)
      .attr("ry", 8)
      .attr("fill", "#2937F0")
      .attr("stroke", "#84BFFF")
      .attr("stroke-width", 2);

    // Add labels with conditional visibility
    const labels = nodes
      .append("g")
      .attr("class", "label-group")
      .attr("transform", "translate(0, -120)")
      .style("opacity", (d) => {
        // Show labels for root node and its direct children initially
        return d.depth <= 1 ? 1 : 0;
      });

    // Add tooltip container
    const tooltip = svg
      .append("g")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // Add label text
    const labelTexts = labels
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("fill", "#170062ff")
      .style("font-size", "50px")
      .style("font-weight", "600")
      .style("font-family", "'Segoe UI', Arial, sans-serif")
      .style("pointer-events", "none")
      .text((d) => d.data.name);

    // Add background rectangles for labels
    labelTexts.each(function () {
      const textWidth = (this as SVGTextElement).getComputedTextLength();
      const padding = 24;

      const parentGroup = d3.select(
        (this as SVGTextElement).parentNode as SVGGElement
      );
      parentGroup
        .insert("rect", "text")
        .attr("x", -textWidth / 2 - padding)
        .attr("y", -30)
        .attr("width", textWidth + padding * 2)
        .attr("height", 60)
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("fill", "black")
        .style("opacity", 0.2)
        .style("stroke", "none");
    });

    // Add tooltip text
    const tooltipText = tooltip
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("fill", "#170062ff")
      .style("font-size", "50px")
      .style("font-weight", "600")
      .style("font-family", "'Segoe UI', Arial, sans-serif")
      .style("pointer-events", "none");

    // Add tooltip background
    const tooltipBg = tooltip
      .append("rect")
      .attr("fill", "black")
      .style("opacity", 0.2)
      .style("stroke", "none");

    // Update hover behavior
    nodes
      .on("mouseover", function (_, d) {
        if (this !== selectedNode) {
          // Scale up node
          d3.select(this)
            .transition()
            .duration(200)
            .attr("transform", `translate(${d.x},${d.y}) scale(1.1)`);

          // Show tooltip for nodes that don't have visible labels
          const selectedNodeData = selectedNode
            ? (selectedNode as any).__data__
            : null;

          // Show tooltip if:
          // 1. No node is selected and node is not root or direct child, or
          // 2. This node is not the selected node and not a descendant of the selected node
          const shouldShowTooltip = !selectedNodeData
            ? d.depth > 1 // Show tooltip for non-root/child nodes when no selection
            : d !== selectedNodeData && !isDescendant(d, selectedNodeData); // Show tooltip for non-selected/descendant nodes

          if (shouldShowTooltip) {
            const textWidth =
              tooltipText.text(d.data.name).node()?.getComputedTextLength() ||
              0;
            const padding = 24;

            tooltipBg
              .attr("x", -textWidth / 2 - padding)
              .attr("y", -30)
              .attr("width", textWidth + padding * 2)
              .attr("height", 60)
              .attr("rx", 6)
              .attr("ry", 6);

            tooltip
              .attr("transform", `translate(${d.x},${d.y - 120})`)
              .transition()
              .duration(200)
              .style("opacity", 1);
          }
        }
      })
      .on("mouseout", function (_, d) {
        if (this !== selectedNode) {
          // Scale down node
          d3.select(this)
            .transition()
            .duration(200)
            .attr("transform", `translate(${d.x},${d.y}) scale(1)`);

          // Hide tooltip
          tooltip.transition().duration(200).style("opacity", 0);
        }
      });

    // Improved resize handler
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);

      const newScale = Math.max(
        0.5,
        Math.min(
          1.2,
          Math.min(
            newWidth / (treeWidth + padding * 2),
            newHeight / (treeHeight + padding * 2)
          )
        )
      );

      const newTransform = d3.zoomIdentity
        .translate(
          (newWidth - treeWidth * newScale) / 2 - minX * newScale,
          (newHeight - treeHeight * newScale) / 2 - minY * newScale
        )
        .scale(newScale);

      if (zoomRef.current) {
        svg.call(zoomRef.current.transform, newTransform);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Static background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("/images/play-background.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8,
        }}
      />
      {/* Tree chart */}
      <div className="relative z-10 w-full h-full bg-transparent touch-none">
        <svg ref={svgRef} className="w-full h-full" />
      </div>
      {/* Modal */}
      <NodeModal
        node={selectedNodeData}
        onClose={() => {
          setSelectedNodeData(null);
          // Only reset the modal state, keep the node scaled up
          if (selectedNodeRef.current) {
            // Keep the node scaled up
            d3.select(selectedNodeRef.current).attr(
              "transform",
              (d: any) => `translate(${d.x},${d.y}) scale(2)`
            );
          }
        }}
      />
    </div>
  );
};

export default Pathway;
