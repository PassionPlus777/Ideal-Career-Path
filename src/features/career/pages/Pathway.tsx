import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useAnalytics } from "../../../core/hooks/useAnalytics";
import ContentLayout from "../../../shared/components/layout/ContentLayout";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-lg w-full m-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <ContentLayout
          imageUrl="/images/illustrations/how-it-works.svg"
          currentStep={3}
          totalSteps={6}
          leftButtonText="Back"
          rightButtonText="Next"
          onLeftButtonClick={onClose}
          onRightButtonClick={onClose}
        >
          <div className="px-6 pt-6 pb-4">
            <h2 className="text-[28px] font-bold mb-6 leading-tight">
              How it works
            </h2>
            <div className="space-y-5">
              {howItWorks.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 rounded-full bg-[#4CD964] flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
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
        </ContentLayout>
      </div>
    </div>
  );
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

    // Create hierarchical data structure with random children
    function createRandomChildren(
      level: number,
      maxLevel: number = 5
    ): NodeData[] | undefined {
      if (level >= maxLevel) return undefined;

      // Always generate 2-3 children for non-leaf nodes
      const numChildren =
        level < maxLevel - 1 ? Math.floor(Math.random() * 2) + 2 : 0;

      if (numChildren === 0) return undefined;

      const children: NodeData[] = [];

      for (let i = 0; i < numChildren; i++) {
        const child: NodeData = {
          id: `${level}-${i}`,
          name: getRandomName(level),
          group: level,
          children: createRandomChildren(level + 1, maxLevel),
        };
        children.push(child);
      }

      return children;
    }

    function getRandomName(level: number): string {
      const names = {
        1: ["Technical Path", "Management Path", "Research Path"],
        2: ["Development", "Architecture", "Leadership"],
        3: ["Backend", "Mobile", "Cloud"],
        4: ["React", "Node.js", "AWS", "Python", "Java"],
        5: ["Senior", "Lead", "Expert", "Architect", "Manager"],
      };

      const levelNames = names[level as keyof typeof names] || ["Role"];
      return levelNames[Math.floor(Math.random() * levelNames.length)];
    }

    const hierarchicalData: NodeData = {
      id: "root",
      name: "Career Start",
      group: 0,
      children: createRandomChildren(1),
    };

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
      .nodeSize([200, 400]); // Even larger spacing for bigger nodes

    // Create the hierarchy
    const root = d3.hierarchy(hierarchicalData);

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

        // Start point: move out from source node center
        const startX = d.source.x + nx * 50;
        const startY = d.source.y + ny * 50;

        // End point: move in from target node center
        const endX = d.target.x - nx * 80;
        const endY = d.target.y - ny * 80;

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
      0.3,
      Math.min(
        0.9,
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
        .scale(0.1)
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

        // If there was a previously selected node, reset it
        if (selectedNode && selectedNode !== this) {
          d3.select(selectedNode)
            .transition()
            .duration(300)
            .attr("transform", (d: any) => `translate(${d.x},${d.y}) scale(1)`);
        }

        // Update selected node reference
        selectedNode = selectedNode === this ? null : this;
        selectedNodeRef.current = selectedNode;

        // Scale up this node to 2x size
        d3.select(this)
          .transition()
          .duration(300)
          .attr("transform", `translate(${d.x},${d.y}) scale(2)`)
          .on("end", () => {
            // Show modal after scaling animation
            if (selectedNode) {
              setSelectedNodeData(d.data);
            }
          });

        // Center on the selected node
        if (selectedNode) {
          const svgElement = svg.node();
          if (svgElement) {
            const svgWidth = svgElement.clientWidth;
            const svgHeight = svgElement.clientHeight;

            const x = svgWidth / 2 - d.x * scale;
            const y = svgHeight / 2 - d.y * scale;

            svg
              .transition()
              .duration(750)
              .call(
                zoom.transform,
                d3.zoomIdentity.translate(x, y).scale(scale)
              );
          }
        } else {
          // If deselecting, return to the initial view
          svg.transition().duration(750).call(zoom.transform, initialTransform);
          setSelectedNodeData(null);
        }
      });

    // First stroke (outer)
    nodes
      .append("rect")
      .attr("class", "outer-stroke")
      .attr("width", 150)
      .attr("height", 150)
      .attr("x", -75)
      .attr("y", -75)
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("fill", "none")
      .attr("stroke", "#0F6FFF")
      .attr("stroke-width", 2)
      .style("stroke-linejoin", "round");

    // Second stroke (inner)
    nodes
      .append("rect")
      .attr("class", "inner-rect")
      .attr("width", 140)
      .attr("height", 140)
      .attr("x", -70)
      .attr("y", -70)
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("fill", "#2937F0")
      .attr("stroke", "#0F6FFF")
      .attr("stroke-width", 2)
      .style("stroke-linejoin", "round");

    // Add permanent labels above nodes
    const labels = nodes
      .append("g")
      .attr("class", "label-group")
      .attr("transform", "translate(0, -100)");

    // Add label text first (to measure it)
    const labelTexts = labels
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .style("fill", "#0F6FFF")
      .style("font-size", "24px")
      .style("font-weight", "600")
      .style("font-family", "'Segoe UI', Arial, sans-serif")
      .style("pointer-events", "none")
      .text((d) => d.data.name);

    // Add background rectangles sized to fit text
    labelTexts.each(function () {
      // const text = d3.select(this);
      const textWidth = (this as SVGTextElement).getComputedTextLength();
      const padding = 24;

      const parentGroup = d3.select(
        (this as SVGTextElement).parentNode as SVGGElement
      );
      parentGroup
        .insert("rect", "text") // Insert before text
        .attr("x", -textWidth / 2 - padding)
        .attr("y", -18)
        .attr("width", textWidth + padding * 2)
        .attr("height", 36)
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("fill", "black")
        .style("opacity", 0.2)
        .style("stroke", "none");
    });

    // Update hover behavior to only work on non-selected nodes
    nodes
      .on("mouseover", function (_, d) {
        if (this !== selectedNode) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("transform", `translate(${d.x},${d.y}) scale(1.1)`);
        }
      })
      .on("mouseout", function (_, d) {
        if (this !== selectedNode) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("transform", `translate(${d.x},${d.y}) scale(1)`);
        }
      });

    // Improved resize handler
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      // Update SVG dimensions
      svg.attr("viewBox", `0 0 ${newWidth} ${newHeight}`);

      // Recalculate and apply transform
      const newScale =
        Math.min(newWidth / (treeWidth + 400), newHeight / (treeHeight + 400)) *
        0.8;

      const newTransform = d3.zoomIdentity
        .translate(
          (newWidth - treeWidth * newScale) / 2 - minX * newScale,
          (newHeight - treeHeight * newScale) / 2 - minY * newScale
        )
        .scale(newScale);

      svg.call(zoom.transform, newTransform);
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
          // Reset node selection and view
          if (selectedNodeRef.current) {
            d3.select(selectedNodeRef.current)
              .transition()
              .duration(300)
              .attr(
                "transform",
                (d: any) => `translate(${d.x},${d.y}) scale(1)`
              );
            selectedNodeRef.current = null;

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
          }
        }}
      />
    </div>
  );
};

export default Pathway;
