export const roadmapCareerPrompt = `Generate a React flow tree-structured learning roadmap for user input position/ skills the following format:
Vertical tree structure with meaningful x/y positions to form a flow
- Structure should be similar to roadmap.sh layout
- Steps should be ordered from fundamentals to advanced
- Include branching for different specializations (if applicable)
- Each node must have a title, short description, and learning resource link
- Use unique IDs for all nodes and edges
- make it more specious node position,
- Response n JSON format
{
roadmapTitle:",
description:<3-5 Lines>,
duration:",
initialNodes : [
{
id: '1',
type: 'turbo',
position: { x: 0, y: 0 },
data: {
title: 'Step Title',
description: 'Short two-line explanation of what the step covers.',
link: 'Helpful link for learning this step',
},
},
...
],
initialEdges : [
{
id: 'e1-2',
source: '1',
target: '2',
},
...
];
}
`