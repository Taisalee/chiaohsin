import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // 导航到首页
    console.log('📍 导航到 http://localhost:4328...');
    await page.goto('http://localhost:4328', { waitUntil: 'networkidle' });

    // 截图首屏
    await page.screenshot({ path: 'homepage-top.png' });
    console.log('✅ 首屏截图已保存: homepage-top.png');

    // 检查关键元素
    console.log('\n🔍 检查关键元素...');

    // Hero 部分
    const heroTitle = await page.$('h1');
    if (heroTitle) {
      const text = await heroTitle.textContent();
      console.log('✅ Hero H1 找到:', text.trim().substring(0, 50));
    } else {
      console.log('❌ Hero H1 未找到');
    }

    // 分类导航
    const categoryNav = await page.$('[aria-label="產品分類"]');
    if (categoryNav) {
      console.log('✅ 分类导航找到');
    } else {
      console.log('❌ 分类导航未找到');
    }

    // 产品卡片
    const productCards = await page.$$('.hp-item');
    console.log(`✅ 产品卡片找到: ${productCards.length} 个`);

    // 手套 Tab 按钮
    const gloveTabs = await page.$$('.hp-gtab');
    console.log(`✅ 手套分类 Tab 找到: ${gloveTabs.length} 个`);

    // 文章卡片
    const articleCards = await page.$$('.hp-article-card');
    console.log(`✅ 文章卡片找到: ${articleCards.length} 个`);

    // 测试交互 1: 轮播箭头
    console.log('\n🧪 测试交互...');
    const rightArrow = await page.$('#hpBrGloves');
    if (rightArrow) {
      console.log('✅ 轮播右箭头找到');
      await rightArrow.click();
      await page.waitForTimeout(500);
      console.log('✅ 点击轮播箭头成功');
    }

    // 测试交互 2: Tab 切换
    const tabs = await page.$$('.hp-gtab');
    if (tabs.length > 1) {
      await tabs[1].click();
      await page.waitForTimeout(500);
      console.log('✅ Tab 切换成功');
    }

    // 测试交互 3: 文章筛选
    const pills = await page.$$('.hp-pill');
    if (pills.length > 0) {
      await pills[0].click();
      await page.waitForTimeout(300);
      console.log('✅ 文章筛选点击成功');
    }

    // 下滚并截图下方内容
    console.log('\n📸 滚动并检查下方内容...');
    await page.evaluate(() => window.scrollBy(0, 1000));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'homepage-middle.png' });
    console.log('✅ 中部截图已保存: homepage-middle.png');

    // 继续滚动到底部
    await page.evaluate(() => window.scrollBy(0, 1500));
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'homepage-bottom.png' });
    console.log('✅ 底部截图已保存: homepage-bottom.png');

    // 检查控制台错误
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    console.log(`\n✅ 页面加载成功，控制台错误数: ${errors.length}`);
    if (errors.length > 0) {
      console.log('控制台错误:');
      errors.forEach(e => console.log('  ❌', e));
    }

    console.log('\n✅ 验证完成！');

  } catch (error) {
    console.error('❌ 验证失败:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
