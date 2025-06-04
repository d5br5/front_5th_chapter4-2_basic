# 바닐라 JS 프로젝트 성능 개선

**URL:** https://d3mfv7ddqzs9uy.cloudfront.net/

## 성능 개선 보고서

### 개선 전 성능 지표

#### 🎯 Lighthouse 점수 + Core Web Vitals (2024)

| 카테고리       | 점수   |
| -------------- | ------ |
| Performance    | 72% 🟠 |
| Accessibility  | 82% 🟠 |
| Best Practices | 75% 🟠 |
| SEO            | 82% 🟠 |

| 메트릭 | 설명                      | 측정값    |
| ------ | ------------------------- | --------- |
| LCP    | Largest Contentful Paint  | 14.56s 🔴 |
| INP    | Interaction to Next Paint | N/A 🟢    |
| CLS    | Cumulative Layout Shift   | 0.011 🟢  |

#### PageSpeed Insights 점수

| 카테고리       | 점수   |
| -------------- | ------ |
| Performance    | 71% 🟠 |
| Accessibility  | 81% 🟠 |
| Best Practices | 96% 🟢 |
| SEO            | 82% 🟠 |

| 메트릭 | 설명                     | 측정값   |
| ------ | ------------------------ | -------- |
| FCP    | First Contentful Paint   | 0.7s 🟢  |
| LCP    | Largest Contentful Paint | 1.9s 🟠  |
| TBT    | Total Blocking Time      | 110ms 🟢 |
| CLS    | Cumulative Layout Shift  | 0.429 🔴 |
| SI     | Speed Index              | 0.7s 🟢  |

### 개선사항

#### 이미지 최적화

commit: 440fbba350b10461d3066362dea459f24c44b741

- 이미지 포맷: JPG -> avif 변경하여, 파일 크기 및 로딩 속도 감소
- 반응형 이미지: 디바이스별 이미지 모두 로드 -> picture + srcset으로 디바이스별 필요 이미지만 로드
- 이미지 크기 명시

```html
<!-- Before -->

<img class="desktop" src="images/Hero_Desktop.jpg" />
<img class="mobile" src="images/Hero_Mobile.jpg" />
<img class="tablet" src="images/Hero_Tablet.jpg" />

<!-- After -->

<picture>
  <source media="(max-width: 576px)" srcset="images/Hero_Mobile.avif" />
  <source media="(max-width: 960px)" srcset="images/Hero_Tablet.avif" />
  <img
    src="images/Hero_Desktop.avif"
    alt="VR Headsets Hero Image"
    loading="eager"
    width="960"
    height="560"
  />
</picture>
```

**적용 전후 개선된 성능 지표 비교**

[ 🎯 Lighthouse 점수 + 📊 Core Web Vitals (2024) ]

| 카테고리    | 점수(전) | 점수(후) | 비교        |
| ----------- | -------- | -------- | ----------- |
| Performance | 72% 🟠   | 76% 🟠   | 4%p 향상 🟢 |

| 메트릭 | 설명                     | 측정값(전) | 측정값(후) | 비교                  |
| ------ | ------------------------ | ---------- | ---------- | --------------------- |
| LCP    | Largest Contentful Paint | 14.56s 🔴  | 5.70s 🔴   | 9.8s (약 66%) 감소 🟢 |

[ PageSpeed Insights 점수 ]

| 카테고리      | 점수(전) | 점수(후) | 비교         |
| ------------- | -------- | -------- | ------------ |
| Performance   | 71% 🟠   | 78% 🟠   | 7%p 향상 🟢  |
| Accessibility | 81% 🟠   | 91% 🟢   | 10%p 향상 🟢 |
| SEO           | 82% 🟠   | 91% 🟢   | 9%p 향상🟢   |

| 메트릭 | 설명                    | 측정값(전) | 측정값(후) | 비교             |
| ------ | ----------------------- | ---------- | ---------- | ---------------- |
| TBT    | Total Blocking Time     | 110ms 🟢   | 260ms 🟠   | 약 2.3배 증가 🔴 |
| CLS    | Cumulative Layout Shift | 0.429 🔴   | 0.056 🟢   | 약 8배 감소 🟢   |

개선된 지표가 많고, 상당부분 개선된 것을 확인 할 수 있다.

TBT 부분은 스크립트 로딩 방식과 관련이 있는 지표기 떄문에, 추후 개선 항목에서 살펴보자.

#### 이미지 lazy loading

```html
<img src="images/vr1.avif" alt="product: Penom Case" loading="lazy" />
```

#### head script 최적화

- defer 속성 추가하여 스크립트를 병렬 로드

```html
<script
  defer
  type="text/javascript"
  src="//www.freeprivacypolicy.com/public/cookie-consent/4.1.0/cookie-consent.js"
  charset="UTF-8"
></script>
```

- font preload

```html
<link
  href="https://fonts.googleapis.com/css?family=Heebo:300,400,600,700&display=swap"
  rel="preload"
  as="style"
/>
```

#### meta 태그 보완

- description content 추가

#### 접근성 향상

- aria-label 속성 추가
- aria-role 보완
- 메뉴 아이콘에 alt 텍스트 추가
- 스크린 리더를 위한 스타일 추가
- form 개선

#### script 동작 최적화

메인스레드 대신 worker에서 수행하도록 이동

**적용 전후 성능 지표 비교 (최종)**

| 카테고리       | 기존 점수 | 개선 점수 | 비교         |
| -------------- | --------- | --------- | ------------ |
| Performance    | 71 🟠     | 94 🟢     | 23점 증가 🟢 |
| Accessibility  | 81 🟠     | 89 🟠     | 8점 증가 🟢  |
| Best Practices | 96 🟢     | 93 🟢     | 3점 감소 🟠  |
| SEO            | 82 🟠     | 100 🟢    | 전면 개선 🟢 |

| 메트릭 | 설명                     | 기존 점수 | 개선 점수 | 비교              |
| ------ | ------------------------ | --------- | --------- | ----------------- |
| FCP    | First Contentful Paint   | 0.7s 🟢   | 0.4s 🟢   | 약 45% 향상 🟢    |
| LCP    | Largest Contentful Paint | 14.56s 🔴 | 1.6s 🟠   | 약 90% 향상 🟢    |
| TBT    | Total Blocking Time      | 110ms 🟢  | 0 ms 🟢   | 100% 전면 개선 🟢 |
| CLS    | Cumulative Layout Shift  | 0.429 🔴  | 0.054 🟢  | 약 90% 향상 🟢    |
| SI     | Speed Index              | 0.7s 🟢   | 0.6s 🟢   | 일부 개선 🟢      |

![image](https://github.com/user-attachments/assets/11be91aa-c280-4115-8bc1-606a28b93f5a)

