import { writeFile } from 'fs/promises';
import { join } from 'path';

const placeholderSVG = `
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f0f0f0"/>
  <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#666" text-anchor="middle">
    No Image Available
  </text>
</svg>
`;

// Save this as /public/images/project-placeholder.png
