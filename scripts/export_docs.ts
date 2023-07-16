import fg from 'fast-glob';
import matter from 'gray-matter';
import fs from 'node:fs';
import path from 'node:path';

const rootDir = path.join(__dirname, '..');
const docsDir = path.join(rootDir, 'docs');

(async () => {
  // Initialize output dir
  fs.mkdirSync(docsDir, { recursive: true });

  // Find all mdx files
  const mdxFiles = await fg('hooks/**/*.mdx', {
    cwd: rootDir,
    deep: 10,
  });

  // Read frontmatter
  const docs: string[] = [];

  mdxFiles.map((mdxFile) => {
    const mdxContent = fs.readFileSync(path.join(rootDir, mdxFile), { encoding: 'utf8' });
    const parsed = matter(mdxContent);
    const frontmatter = parsed.data;

    const fileName = `${frontmatter.name}.mdx`;

    docs.push(frontmatter.name);
    fs.writeFileSync(path.join(docsDir, fileName), mdxContent);
  });

  fs.writeFileSync(path.join(docsDir, 'routes.json'), JSON.stringify(docs, null, 2));
})();
