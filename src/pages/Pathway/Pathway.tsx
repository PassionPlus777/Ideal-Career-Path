import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useAnalytics } from "../../hooks/useAnalytics";

interface NodeData {
  id: string;
  name: string;
  group: number;
  children?: NodeData[];
}

const Pathway: React.FC = () => {
  const { trackScreenView } = useAnalytics();
  const svgRef = useRef<SVGSVGElement>(null);

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
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create the SVG with improved centering
    const svg = d3
      .select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    // Define gradients and filters
    const defs = svg.append("defs");

    // Create gradient for nodes
    const gradients = defs
      .selectAll("linearGradient")
      .data([0, 1, 2, 3, 4, 5])
      .enter()
      .append("linearGradient")
      .attr("id", (d) => `gradient-${d}`)
      .attr("gradientTransform", "rotate(45)");

    gradients
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", (d) => {
        const colors = [
          "#2196F3",
          "#1E88E5",
          "#1976D2",
          "#1565C0",
          "#0D47A1",
          "#0D47A1",
        ];
        return colors[d];
      });

    gradients
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", (d) => {
        const colors = [
          "#64B5F6",
          "#42A5F5",
          "#2196F3",
          "#1E88E5",
          "#1976D2",
          "#1976D2",
        ];
        return colors[d];
      });

    // Add drop shadow filter
    const filter = defs
      .append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");

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
    const container = svg.append("g");

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

    // Create links with curved paths and enhanced style
    container
      .selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        d3
          .linkVertical<any, any>()
          .x((d) => d.x)
          .y((d) => d.y)
      )
      .attr("fill", "none")
      .attr("stroke", "url(#gradient-1)")
      .attr("stroke-width", 3)
      .attr("opacity", 0.6)
      .style("filter", "url(#drop-shadow)");

    // Create nodes with enhanced style
    const nodes = container
      .selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer")
      .on("click", function () {
        // Reset all nodes to default size
        nodes.selectAll("circle").transition().duration(200).attr("r", 70);

        // Make clicked node bigger
        d3.select(this)
          .select("circle")
          .transition()
          .duration(200)
          .attr("r", 100);
      });

    // Add node circles with gradient and shadow
    nodes
      .append("circle")
      .attr("r", 70)
      .attr("fill", (d) => `url(#gradient-${d.data.group})`)
      .attr("stroke", "#fff")
      .attr("stroke-width", 3)
      .style("filter", "url(#drop-shadow)");

    // Add white background for text
    nodes
      .append("circle")
      .attr("r", 60)
      .attr("fill", "rgba(255, 255, 255, 0.1)")
      .attr("stroke", "none");

    // Add labels with enhanced style
    const labels = nodes
      .append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("fill", "#fff")
      .style("font-size", "22px")
      .style("font-weight", "600")
      .style("text-shadow", "1px 1px 2px rgba(0,0,0,0.3)")
      .style("user-select", "none")
      .style("cursor", "pointer");

    // Split text into multiple lines with enhanced style
    labels.each(function (d) {
      const text = d3.select(this);
      const words = d.data.name.split(/\s+/);
      const lineHeight = 1.3;

      let line: string[] = [];
      let lineNumber = 0;
      const maxLines = 3;
      let currentLine = 0;

      words.forEach((word, i) => {
        if (currentLine < maxLines) {
          line.push(word);
          if (i === words.length - 1 || currentLine === maxLines - 1) {
            text
              .append("tspan")
              .attr("x", 0)
              .attr(
                "dy",
                `${
                  lineNumber === 0
                    ? -(((maxLines - 1) * lineHeight) / 2)
                    : lineHeight
                }em`
              )
              .text(line.join(" "))
              .style("font-family", "'Segoe UI', Arial, sans-serif")
              .style("font-size", "22px");
            line = [];
            currentLine++;
          }
        }
      });
    });

    // Add subtle animation on node hover
    nodes
      .on("mouseover", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", function (d: any) {
            return `translate(${d.x},${d.y}) scale(1.1)`;
          });
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", function (d: any) {
            return `translate(${d.x},${d.y}) scale(1)`;
          });
      });

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

    // Add zoom behavior
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 4])
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      });

    // Improved initial transform calculation
    const scale = Math.max(
      Math.min(
        width / (treeWidth + 400), // Increased padding for better centering
        height / (treeHeight + 400)
      ) * 0.8, // Slightly reduced scale for better fit
      0.3 // Minimum scale value to match zoom.scaleExtent
    );

    const initialTransform = d3.zoomIdentity
      .translate(
        (width - treeWidth * scale) / 2 - minX * scale,
        (height - treeHeight * scale) / 2 - minY * scale
      )
      .scale(scale);

    svg.call(zoom).call(zoom.transform, initialTransform);

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
    </div>
  );
};

export default Pathway;
