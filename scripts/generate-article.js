#!/usr/bin/env node

/**
 * 自动生成 Astro 文章页面脚本
 * 使用方法：node scripts/generate-article.js <article-folder>
 * 例如：node scripts/generate-article.js articles/pu-coating-guide
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}\n`)
};

// 获取参数
const articleFolder = process.argv[2];

if (!articleFolder) {
  log.error('缺少参数。使用方法：');
  console.log('  node scripts/generate-article.js <article-folder>');
  console.log('  例如：node scripts/generate-article.js pu-coating-guide');
  process.exit(1);
}

// 路径配置
const articlesDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const articlePath = path.join(articlesDir, articleFolder);
const dataFile = path.join(articlePath, 'data.json');
const contentFile = path.join(articlePath, 'content.md');
const outputFile = path.join(articlePath, 'index.md');

log.title(`📝 自动生成文章: ${articleFolder}`);

// 1. 验证文件
log.info('步骤 1/3: 验证输入文件...');

if (!fs.existsSync(dataFile)) {
  log.error(`找不到 data.json: ${dataFile}`);
  process.exit(1);
}

if (!fs.existsSync(contentFile)) {
  log.error(`找不到 content.md: ${contentFile}`);
  process.exit(1);
}

log.success('输入文件验证通过');

// 2. 读取数据
log.info('步骤 2/3: 读取数据文件...');

let articleData;
let markdownContent;

try {
  const dataJson = fs.readFileSync(dataFile, 'utf-8');
  articleData = JSON.parse(dataJson);
  log.success('data.json 读取成功');
} catch (err) {
  log.error(`读取 data.json 失败: ${err.message}`);
  process.exit(1);
}

try {
  markdownContent = fs.readFileSync(contentFile, 'utf-8');
  log.success('content.md 读取成功');
} catch (err) {
  log.error(`读取 content.md 失败: ${err.message}`);
  process.exit(1);
}

// 验证数据结构
if (!articleData.metadata || !articleData.metadata.title) {
  log.error('data.json 缺少必需字段: metadata.title');
  process.exit(1);
}

// 3. 生成 index.md（Astro content collection 格式）
log.info('步骤 3/3: 生成 index.md...');

const indexMdContent = generateIndexMd(articleData, markdownContent);

try {
  fs.writeFileSync(outputFile, indexMdContent, 'utf-8');
  log.success(`index.md 已生成: ${path.relative(process.cwd(), outputFile)}`);
} catch (err) {
  log.error(`生成 index.md 失败: ${err.message}`);
  process.exit(1);
}

log.title(`✨ 完成！`);
console.log(`  📄 文章文件：src/content/blog/${articleFolder}/index.md`);
console.log(`  🌐 访问地址：/blog/${articleFolder}`);
console.log(`  ✅ 页面会自动出现在博客列表中\n`);

// ============ 函数定义 ============

/**
 * 生成 index.md（Astro content collection 格式）
 */
function generateIndexMd(data, markdown) {
  const { metadata } = data;

  // 将元数据转换为 frontmatter
  const frontmatter = `---
title: "${metadata.title.replace(/"/g, '\\"')}"
description: "${metadata.description.replace(/"/g, '\\"')}"
publishDate: ${metadata.publishDate}
image: "./cover.jpg"
category: "${metadata.category}"
tags: [${metadata.tags.map(t => `"${t}"`).join(', ')}]
featured: ${metadata.featured || false}
draft: false
---

`;

  // 移除 content.md 中的标题（如果存在）
  // 假设第一行是 # 标题，我们跳过它
  const lines = markdown.split('\n');
  let content = markdown;

  if (lines[0].startsWith('# ')) {
    // 移除第一行的一级标题
    content = lines.slice(1).join('\n').trimStart();
  }

  return frontmatter + content;
}

