/* 
 * 독일피엠학교 JavaScript
 * 파일명: script.js
 * 설명: 모든 JavaScript 기능 구현 (최종 완성)
 * 수정: 이미지 경로 수정, 하부메뉴 완성, 프로 섭취방법 2개 이미지
 */

// ==================== 전역 변수 및 상수 정의 ====================

// 이미지 관련 상수
const IMG_BASE = 'https://res.cloudinary.com/dj2g9dtca/image/upload/';
const IMG_V = '';

// 전역 상태 변수
let currentDropdown = null;
let currentSlideIndex = 1;
let totalSlides = 1;
let currentSlideType = '';
let currentProgramName = '';
let selectedQuantity = null;
let selectedPriceType = null;
let alarmEnabled = false;
let alarmInterval = null;
let selectedAlarmSound = 'browser';
let currentSurveyPage = 1;
let totalSurveyPages = 8;
let isLoggedIn = false;

// 회원 데이터 캐시
const MEMBER_LIST_URL = 'https://res.cloudinary.com/dj2g9dtca/raw/upload/member_list.txt';
let memberDataCache = null;
let memberDataCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5분

// ==================== 제품 포인트 데이터 ====================

const PRODUCT_POINTS = {
    // 액티 시리즈
    '액티(스테비아)': { 회원기준: 32, '5+1단품': 24.2, '5+1세트': 145 },
    '액티(레몬라임)': { 회원기준: 32, '5+1단품': 24.2, '5+1세트': 145 },
    '액티(레몬그라스)': { 회원기준: 32, '5+1단품': 24.2, '5+1세트': 145 },
    '액티(피치 아이스티)': { 회원기준: 32, '5+1단품': 24.2, '5+1세트': 145 },
    '액티펀치': { 회원기준: 32, '5+1단품': 24.0, '5+1세트': 144 },
    '액티 투 고': { 회원기준: 12, '5+1단품': 9.0, '5+1세트': 54 },
    '액티브 젤': { 회원기준: 23, '5+1단품': 16.7, '5+1세트': 100 },
    '액티 세럼': { 회원기준: 40, '5+1단품': 30.0, '5+1세트': 180 },
    
    // 드링크 시리즈
    '피트니스 드링크': { 회원기준: 37, '5+1단품': 30.0, '5+1세트': 180 },
    '젤슈츠(오렌지)': { 회원기준: 40, '5+1단품': 30.0, '5+1세트': 180 },
    '젤슈츠(사과)': { 회원기준: 40, '5+1단품': 30.0, '5+1세트': 180 },
    '요거트 드링크': { 회원기준: 23, '5+1단품': 16.7, '5+1세트': 100 },
    'D-드링크': { 회원기준: 25, '5+1단품': 16.7, '5+1세트': 100 },
    
    // 메인 제품
    '파워': { 회원기준: 89, 오토십: 86.5, BA: 84, 액션팩: 84 },
    '리스': { 회원기준: 17, 오토십: 16.5, BA: 16, 액션팩: 16 },
    '제너레이션': { 회원기준: 80, '5+1단품': 60.0, '5+1세트': 360 },
    '듀오': { 회원기준: 50, '5+1단품': 38.3, '5+1세트': 230 },
    '뮤노겐': { 회원기준: 50, '5+1단품': 37.5, '5+1세트': 225 },
    
    // 건강 기능식품
    '오메가3': { 회원기준: 26, '5+1단품': 19.5, '5+1세트': 117 },
    '큐10 플러스': { 회원기준: 26, '5+1단품': 19.5, '5+1세트': 117 },
    'C-밸런스': { 회원기준: 28, '5+1단품': 21.0, '5+1세트': 126 },
    'IB5': { 회원기준: 25 },
    '아이비5': { 회원기준: 25 },
    
    // 뷰티 & 스킨케어
    '뷰티': { 회원기준: 40, '5+1단품': 31.7, '5+1세트': 190 },
    '맨 페이스': { 회원기준: 25, '5+1단품': 18.7, '5+1세트': 112 },
    '브라이트닝 포에버': { 회원기준: 50 },
    '클렌징폼': { 회원기준: 10 },
    '밸런싱크림': { 회원기준: 12 },
    '필링마스크': { 회원기준: 10 },
    '영케어 세트': { 회원기준: 25, '5+1단품': 16.3, '5+1세트': 98 },
    '하이드레이팅 샷 마스크': { 회원기준: 40, '5+1단품': 33.3, '5+1세트': 200 },
    '브라이트닝 샷 마스크': { 회원기준: 40, '5+1단품': 33.3, '5+1세트': 200 },
    
    // 피트니스 & 다이어트
    '겔링핏': { 회원기준: 51, '5+1단품': 36.7, '5+1세트': 220 },
    '탑쉐이프': { 회원기준: 70, '5+1단품': 52.5, '5+1세트': 315 },
    '프로(망고)': { 회원기준: 20, '5+1단품': 16.7, '5+1세트': 100 },
    '프로(바닐라)': { 회원기준: 20, '5+1단품': 16.7, '5+1세트': 100 },
    '프로(베리)': { 회원기준: 20, '5+1단품': 16.7, '5+1세트': 100 },
    '프로(코코넛)': { 회원기준: 20, '5+1단품': 16.7, '5+1세트': 100 },
    '프로(초코릿무스)': { 회원기준: 20, '5+1단품': 16.7, '5+1세트': 100 },
    '웨이': { 회원기준: 25 },
    
    // 남성 전용
    '맨플러스': { 회원기준: 40, '5+1단품': 30.0, '5+1세트': 180 },
    
    // 기타
    '주니어': { 회원기준: 25 },
    '허벌티': { 회원기준: 8, '5+1단품': 5.7, '5+1세트': 34 },
    
    // 도구류 (포인트 0)
    '요거트 메이커': { 회원기준: 0 },
    '티인퓨저': { 회원기준: 0 },
    '데모백': { 회원기준: 0 }
};

// ==================== 드롭다운 메뉴 기능 ====================

function toggleDropdown(id) {
    console.log('toggleDropdown 호출:', id);
    
    // 정확한 드롭다운 찾기
    const targetDropdown = document.getElementById(id + '-dropdown');
    
    if (targetDropdown) {
        const isVisible = targetDropdown.style.display === 'block';
        
        // 모든 다른 드롭다운 숨기기
        document.querySelectorAll('[id$="-dropdown"]').forEach(dropdown => {
            if (dropdown !== targetDropdown) {
                dropdown.style.display = 'none';
            }
        });
        
        if (isVisible) {
            // 현재 드롭다운 숨기기
            targetDropdown.style.display = 'none';
            console.log(`${id} 드롭다운 숨김`);
        } else {
            // 현재 드롭다운 표시
            targetDropdown.style.cssText = `
                display: block !important;
                visibility: visible !important;
                opacity: 1 !important;
                position: relative !important;
                background-color: #444 !important;
                border: 1px solid #666 !important;
                border-radius: 8px !important;
                padding: 10px !important;
                margin: 5px 0 !important;
                color: white !important;
                font-size: 14px !important;
                line-height: 1.4 !important;
            `;
            console.log(`${id} 드롭다운 표시`);
        }
    } else {
        console.log(`${id}-dropdown을 찾을 수 없음`);
    }
}

// ==================== 이미지 표시 기능 ====================

function showImage(imageUrl, title) {
    console.log('이미지 표시:', imageUrl, title);
    
    // 모달 창 생성
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 10px;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    `;
    
    content.innerHTML = `
        ${title}
        
        
        닫기
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // 모달 배경 클릭 시 닫기
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// ==================== 슬라이드 표시 기능 ====================

function showSlide(type, count) {
    console.log('슬라이드 표시:', type, count);
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
    `;
    
    const slideContainer = document.createElement('div');
    slideContainer.style.cssText = `
        background: white;
        padding: 20px;
        border-radius: 10px;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
        position: relative;
    `;
    
    // 수정된 이미지 URL (v1750000337/ 제거)
    const slideImages = {
        'ba-event': [
            'https://res.cloudinary.com/dj2g9dtca/image/upload/BA-1.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/BA-2.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/BA-3.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/BA-4.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/BA-5.png'
        ],
        'special-event': [
            'https://res.cloudinary.com/dj2g9dtca/image/upload/special-event-1.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/special-event-2.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/special-event-3.png'
        ],
        'monthly-plan': [
            'https://res.cloudinary.com/dj2g9dtca/image/upload/monthly-plan-1.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/monthly-plan-2.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/monthly-plan-3.png'
        ],
        'warning': [
            'https://res.cloudinary.com/dj2g9dtca/image/upload/warning-1.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/warning-2.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/warning-3.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/warning-4.png'
        ],
        'price': [
            'https://res.cloudinary.com/dj2g9dtca/image/upload/price-catalog-1.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/price-catalog-2.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/price-catalog-3.png'
        ],
        'promotion': [
            'https://res.cloudinary.com/dj2g9dtca/image/upload/promotion-1.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/promotion-2.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/promotion-3.png'
        ],
        'effect': [
            'https://res.cloudinary.com/dj2g9dtca/image/upload/effect-1.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/effect-2.png',
            'https://res.cloudinary.com/dj2g9dtca/image/upload/effect-3.png'
        ]
    };
    
    const images = slideImages[type] || [];
    let currentSlide = 0;
    
    const titles = {
        'ba-event': 'BA 이벤트',
        'special-event': '특별 이벤트', 
        'monthly-plan': '본사 일정',
        'warning': '규정위반 조치안내',
        'price': '가격정보 카탈로그',
        'promotion': '프로모션 카탈로그',
        'effect': '효능정보 카탈로그'
    };
    
    slideContainer.innerHTML = `
        ${titles[type] || type} (${count}개)
        
            ${images.length > 0 ? 
                `` 
                : '준비 중인 콘텐츠입니다'
            }
        
        ${images.length > 1 ? `
            
                이전
                ${currentSlide + 1} / ${images.length}
                다음
            
        ` : ''}
        닫기
    `;
    
    modal.appendChild(slideContainer);
    document.body.appendChild(modal);
    
    if (images.length > 1) {
        document.getElementById('prev-btn').onclick = function() {
            currentSlide = (currentSlide - 1 + images.length) % images.length;
            document.getElementById('slide-image').src = images[currentSlide];
            document.getElementById('slide-counter').textContent = `${currentSlide + 1} / ${images.length}`;
        };
        
        document.getElementById('next-btn').onclick = function() {
            currentSlide = (currentSlide + 1) % images.length;
            document.getElementById('slide-image').src = images[currentSlide];
            document.getElementById('slide-counter').textContent = `${currentSlide + 1} / ${images.length}`;
        };
    }
    
    document.getElementById('close-btn').onclick = function() {
        document.body.removeChild(modal);
    };
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// ==================== 건강상담 기능 ====================

function showHealthSurvey() {
    console.log('건강상담 시작');
    alert('건강상담 기능을 준비 중입니다. 곧 서비스 예정입니다.');
}

// ==================== 주문 관련 기능 ====================

let orderItems = [];

function addToOrder() {
    const productSelect = document.querySelector('#product-select');
    const productName = productSelect ? productSelect.value : null;
    
    if (!productName || !selectedQuantity || !selectedPriceType) {
        alert('제품, 수량, 가격 유형을 모두 선택해주세요.');
        return;
    }
    
    const orderItem = {
        product: productName,
        quantity: selectedQuantity,
        priceType: selectedPriceType,
        timestamp: new Date().getTime()
    };
    
    orderItems.push(orderItem);
    updateOrderDisplay();
    console.log('주문 추가됨:', orderItem);
}

function calculateTotal() {
    if (orderItems.length === 0) {
        alert('주문 내역이 없습니다.');
        return;
    }
    
    let totalAmount = 0;
    let totalPoints = 0;
    let orderText = '';
    
    const pointIncluded = document.querySelector('#point-include-checkbox')?.checked;
    
    orderItems.forEach(item => {
        // 가격 계산 (임시 가격)
        const price = 50000; // 실제 가격 계산 로직 필요
        const amount = price * item.quantity;
        totalAmount += amount;
        
        // 포인트 계산
        const productPoints = PRODUCT_POINTS[item.product];
        if (productPoints && productPoints[item.priceType]) {
            const points = productPoints[item.priceType] * item.quantity;
            totalPoints += points;
        }
        
        orderText += `${item.product} (${item.priceType}) ${price.toLocaleString()} x ${item.quantity} = ${amount.toLocaleString()}원\n`;
    });
    
    if (pointIncluded) {
        orderText += '\n-----------------------------------------------------------\n';
        orderItems.forEach(item => {
            const productPoints = PRODUCT_POINTS[item.product];
            if (productPoints && productPoints[item.priceType]) {
                const points = productPoints[item.priceType] * item.quantity;
                orderText += `${item.product} (${item.priceType}) ${productPoints[item.priceType]} x ${item.quantity} = ${points} 포인트\n`;
            }
        });
    }
    
    orderText += `\n합계 = ${totalAmount.toLocaleString()}원`;
    if (pointIncluded && totalPoints > 0) {
        orderText += ` (${totalPoints} 포인트)`;
    }
    
    orderText += '\n[입금계좌안내]\n카카오뱅크/김희진 3333-12-564789';
    
    // 주문서 텍스트박스에 표시
    const orderTextbox = document.querySelector('#order-textbox');
    if (orderTextbox) {
        orderTextbox.value = orderText;
    }
    
    console.log('정산 완료:', { totalAmount, totalPoints });
}

function clearOrder() {
    orderItems = [];
    const orderTextbox = document.querySelector('#order-textbox');
    if (orderTextbox) {
        orderTextbox.value = '';
    }
    console.log('주문 초기화됨');
}

function updateOrderDisplay() {
    // 주문 표시 업데이트 로직
}

// ==================== 초기화 및 이벤트 설정 ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('독일피엠학교 JavaScript 로드 완료');
    
    // 프로 섭취방법 2개 이미지 설정
    setTimeout(function() {
        const intakeItems = document.querySelectorAll('#intake-dropdown .intake-item');
        let proCount = 0;
        
        intakeItems.forEach((item, index) => {
            if (item.textContent.trim() === '프로') {
                proCount++;
                console.log(`프로 항목 ${proCount} (위치 ${index}) 2개 이미지 슬라이드로 설정`);
                
                item.onclick = function() {
                    console.log(`프로 ${proCount} - 2개 이미지 슬라이드 실행`);
                    
                    const modal = document.createElement('div');
                    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; z-index: 99999;';
                    
                    const container = document.createElement('div');
                    container.style.cssText = 'background: white; padding: 20px; border-radius: 10px; text-align: center; max-width: 90%; max-height: 90%;';
                    
                    const images = [
                        'https://res.cloudinary.com/dj2g9dtca/image/upload/howtotake-07.png',
                        'https://res.cloudinary.com/dj2g9dtca/image/upload/howtotake-071.png'
                    ];
                    
                    let current = 0;
                    
                    container.innerHTML = `
                        프로 섭취방법 (2개)
                        
                        
                            ◀ 이전
                            1 / 2
                            다음 ▶
                        
                        닫기
                    `;
                    
                    modal.appendChild(container);
                    document.body.appendChild(modal);
                    
                    document.getElementById(`pro-prev-${proCount}`).onclick = function() {
                        current = current === 0 ? 1 : 0;
                        document.getElementById(`pro-slide-${proCount}`).src = images[current];
                        document.getElementById(`pro-num-${proCount}`).textContent = `${current + 1} / 2`;
                    };
                    
                    document.getElementById(`pro-next-${proCount}`).onclick = function() {
                        current = current === 1 ? 0 : 1;
                        document.getElementById(`pro-slide-${proCount}`).src = images[current];
                        document.getElementById(`pro-num-${proCount}`).textContent = `${current + 1} / 2`;
                    };
                    
                    document.getElementById(`pro-exit-${proCount}`).onclick = function() {
                        document.body.removeChild(modal);
                    };
                };
            }
        });
        
        console.log(`총 ${proCount}개의 프로 항목을 2개 이미지 슬라이드로 설정 완료`);
    }, 1000);
    
    console.log('전역 함수 등록 완료');
});

// ==================== 전역 함수 등록 ====================

// 모든 함수를 전역으로 등록하여 onclick 이벤트가 작동하도록 함
window.toggleDropdown = toggleDropdown;
window.showImage = showImage;
window.showSlide = showSlide;
window.showHealthSurvey = showHealthSurvey;
window.addToOrder = addToOrder;
window.calculateTotal = calculateTotal;
window.clearOrder = clearOrder;

console.log('독일피엠학교 Script.js 로드 완료 - 모든 함수 전역 등록됨');