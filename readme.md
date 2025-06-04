# 바닐라 JS 프로젝트 성능 개선
**URL:** https://front-5th-chapter4-2-basic-puce.vercel.app

## 성능 개선 보고서 

### 개선 전 성능 지표

#### 🎯 Lighthouse 점수

| 카테고리 | 점수 | 상태 |
|----------|------|------|
| Performance | 72% | 🟠 |
| Accessibility | 82% | 🟠 |
| Best Practices | 75% | 🟠 |
| SEO | 82% | 🟠 |

#### 📊 Core Web Vitals
| 메트릭 | 설명 | 측정값 | 상태 |
|--------|------|--------|------|
| LCP | Largest Contentful Paint | 14.56s | 🔴 |
| INP | Interaction to Next Paint | N/A | 🟢 |
| CLS | Cumulative Layout Shift | 0.011 | 🟢 |


#### PageSpeed Insights 점수

| 카테고리 | 점수 | 상태 |
|----------|------|------|
| Performance | 71% | 🟠 |
| Accessibility | 81% | 🟠 |
| Best Practices | 96% | 🟢 |
| SEO | 82% | 🟠 |

### 개선사항

#### 이미지 최적화

- 이미지 포맷: JPG -> avif 변경하여, 파일 크기 및 로딩 속도 감소
- 반응형 이미지: 디바이스별 이미지 모두 로드 -> picture + srcset으로 디바이스별 필요 이미지만 로드
- 이미지 크기 명시

```html
<!-- Before -->

<img class="desktop" src="images/Hero_Desktop.jpg">
<img class="mobile" src="images/Hero_Mobile.jpg">
<img class="tablet" src="images/Hero_Tablet.jpg">

<!-- After -->

<picture>
  <source media="(max-width: 576px)" srcset="images/Hero_Mobile.avif" />
  <source media="(max-width: 960px)" srcset="images/Hero_Tablet.avif" />
  <img src="images/Hero_Desktop.avif" alt="VR Headsets Hero Image" loading="eager"  width="960" height="560"/>
</picture>
```

