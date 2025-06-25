/* 
 * 독일피엠학교 JavaScript
 * 파일명: script.js
 * 설명: 모든 JavaScript 기능 구현 + 전역 함수 등록
 * 의존성: styles.css
 */

// ==================== 전역 변수 및 상수 정의 ====================

// 이미지 관련 상수
const IMG_BASE = 'https://res.cloudinary.com/dj2g9dtca/image/upload/';
const IMG_V = 'v1750000337/';

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

// ==================== 제품 가격 데이터 ====================
const PRODUCT_PRICES = {
    '파워': { 회원가격: 89000, 오토십: 86500, BA: 93762, 액션팩: 84000 },
    '리스': { 회원가격: 17000, 오토십: 16500, BA: 25278, 액션팩: 16000 },
    '액티(스테비아)': { 회원가격: 32000, '5+1단품': 24200, '5+1세트': 145000 },
    // ... 기타 제품 가격들
};

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

// 주문 데이터
let orderItems = [];
let isPointsIncluded = false;

// ==================== 핵심 함수들 ====================

// 드롭다운 토글 함수
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    
    // 다른 드롭다운 닫기
    if (currentDropdown && currentDropdown !== dropdown) {
        currentDropdown.style.display = 'none';
    }
    
    // 현재 드롭다운 토글
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
        currentDropdown = null;
    } else {
        dropdown.style.display = 'block';
        currentDropdown = dropdown;
    }
}

// 제품 선택 함수
function selectProduct(productName) {
    const productSelect = document.querySelector('#productSelect');
    if (productSelect) {
        productSelect.textContent = productName;
        productSelect.value = productName;
    }
    toggleDropdown('productDropdown');
}

// 수량 선택 함수
function selectQuantity(quantity) {
    selectedQuantity = quantity;
    const quantityDisplay = document.querySelector('#quantityDisplay');
    if (quantityDisplay) {
        quantityDisplay.textContent = quantity;
    }
}

// 가격 유형 선택 함수
function selectPriceType(priceType) {
    selectedPriceType = priceType;
    const priceTypeDisplay = document.querySelector('#priceTypeDisplay');
    if (priceTypeDisplay) {
        priceTypeDisplay.textContent = priceType;
    }
}

// 포인트 포함 체크박스 토글
function togglePointsIncluded() {
    const checkbox = document.querySelector('#pointsCheckbox');
    if (checkbox) {
        isPointsIncluded = checkbox.checked;
    }
}

// 주문에 추가하는 함수
function addToOrder() {
    const productSelect = document.querySelector('#productSelect');
    const productName = productSelect ? productSelect.value : null;
    
    if (!productName || !selectedQuantity || !selectedPriceType) {
        alert('제품, 수량, 가격 유형을 모두 선택해주세요.');
        return;
    }
    
    const priceData = PRODUCT_PRICES[productName];
    const pointData = PRODUCT_POINTS[productName];
    
    if (!priceData || !pointData) {
        alert('선택한 제품의 가격 정보를 찾을 수 없습니다.');
        return;
    }
    
    const unitPrice = priceData[selectedPriceType];
    const unitPoints = pointData[selectedPriceType] || 0;
    const totalPrice = unitPrice * selectedQuantity;
    const totalPoints = unitPoints * selectedQuantity;
    
    const orderItem = {
        product: productName,
        priceType: selectedPriceType,
        quantity: selectedQuantity,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
        unitPoints: unitPoints,
        totalPoints: totalPoints
    };
    
    orderItems.push(orderItem);
    updateOrderDisplay();
}

// 주문 표시 업데이트
function updateOrderDisplay() {
    const orderList = document.querySelector('#orderList');
    if (!orderList) return;
    
    let html = '';
    let grandTotalPrice = 0;
    let grandTotalPoints = 0;
    
    // 가격 정보 표시
    orderItems.forEach(item => {
        html += ``;
        html += `${item.product} (${item.priceType}) ${item.unitPrice.toLocaleString()} x ${item.quantity} = ${item.totalPrice.toLocaleString()}원`;
        html += ``;
        grandTotalPrice += item.totalPrice;
    });
    
    // 포인트 포함 시 구분선과 포인트 정보 표시
    if (isPointsIncluded) {
        html += '';
        
        orderItems.forEach(item => {
            html += ``;
            html += `${item.product} (${item.priceType}) ${item.unitPoints} x ${item.quantity} = ${item.totalPoints}원`;
            html += ``;
            grandTotalPoints += item.totalPoints;
        });
    }
    
    orderList.innerHTML = html;
}

// 정산 함수
function calculateTotal() {
    const orderList = document.querySelector('#orderList');
    if (!orderList || orderItems.length === 0) {
        alert('주문 내역이 없습니다.');
        return;
    }
    
    let html = '';
    let grandTotalPrice = 0;
    let grandTotalPoints = 0;
    
    // 가격 정보 표시
    orderItems.forEach(item => {
        html += ``;
        html += `${item.product} (${item.priceType}) ${item.unitPrice.toLocaleString()} x ${item.quantity} = ${item.totalPrice.toLocaleString()}원`;
        html += ``;
        grandTotalPrice += item.totalPrice;
    });
    
    // 포인트 포함 시 구분선과 포인트 정보 표시
    if (isPointsIncluded) {
        html += '';
        
        orderItems.forEach(item => {
            html += ``;
            html += `${item.product} (${item.priceType}) ${item.unitPoints} x ${item.quantity} = ${item.totalPoints} 포인트`;
            html += ``;
            grandTotalPoints += item.totalPoints;
        });
    }
    
    // 합계 표시
    html += '';
    if (isPointsIncluded) {
        html += `합계 = ${grandTotalPrice.toLocaleString()}원 (${grandTotalPoints} 포인트)`;
    } else {
        html += `합계 = ${grandTotalPrice.toLocaleString()}원`;
    }
    html += '[입금계좌안내]카카오뱅크/김희진 3333-12-564789';
    html += '';
    
    orderList.innerHTML = html;
}

// 주문 초기화
function clearOrder() {
    orderItems = [];
    const orderList = document.querySelector('#orderList');
    if (orderList) {
        orderList.innerHTML = '';
    }
}

// 초기화 함수
function resetOrder() {
    clearOrder();
    selectedQuantity = null;
    selectedPriceType = null;
    isPointsIncluded = false;
    
    const productSelect = document.querySelector('#productSelect');
    const quantityDisplay = document.querySelector('#quantityDisplay');
    const priceTypeDisplay = document.querySelector('#priceTypeDisplay');
    const pointsCheckbox = document.querySelector('#pointsCheckbox');
    
    if (productSelect) productSelect.textContent = '제품을 선택하세요';
    if (quantityDisplay) quantityDisplay.textContent = '수량';
    if (priceTypeDisplay) priceTypeDisplay.textContent = '가격유형';
    if (pointsCheckbox) pointsCheckbox.checked = false;
}

// 회원 데이터 로드 함수
async function loadMemberData() {
    const now = Date.now();
    if (memberDataCache && (now - memberDataCacheTime) < CACHE_DURATION) {
        return memberDataCache;
    }
    
    try {
        const response = await fetch(MEMBER_LIST_URL);
        const text = await response.text();
        memberDataCache = text.split('\n').filter(line => line.trim());
        memberDataCacheTime = now;
        return memberDataCache;
    } catch (error) {
        console.error('회원 데이터 로드 실패:', error);
        return [];
    }
}

// 기타 유틸리티 함수들
function showSlide(slideType, programName, slideIndex) {
    currentSlideType = slideType;
    currentProgramName = programName;
    currentSlideIndex = slideIndex;
    // 슬라이드 표시 로직 구현
}

function nextSlide() {
    if (currentSlideIndex < totalSlides) {
        currentSlideIndex++;
        showSlide(currentSlideType, currentProgramName, currentSlideIndex);
    }
}

function prevSlide() {
    if (currentSlideIndex > 1) {
        currentSlideIndex--;
        showSlide(currentSlideType, currentProgramName, currentSlideIndex);
    }
}

// ==================== 전역 함수 등록 ====================
// 모든 함수를 window 객체에 명시적으로 등록

window.toggleDropdown = toggleDropdown;
window.selectProduct = selectProduct;
window.selectQuantity = selectQuantity;
window.selectPriceType = selectPriceType;
window.togglePointsIncluded = togglePointsIncluded;
window.addToOrder = addToOrder;
window.updateOrderDisplay = updateOrderDisplay;
window.calculateTotal = calculateTotal;
window.clearOrder = clearOrder;
window.resetOrder = resetOrder;
window.loadMemberData = loadMemberData;
window.showSlide = showSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

// 추가로 필요한 함수들도 전역 등록
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'block';
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
};

window.goBack = function() {
    history.back();
};

window.goHome = function() {
    window.location.href = '/';
};

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('독일피엠학교 JavaScript 로드 완료');
    console.log('전역 함수 등록 완료');
    
    // 포인트 체크박스 이벤트 리스너 등록
    const pointsCheckbox = document.querySelector('#pointsCheckbox');
    if (pointsCheckbox) {
        pointsCheckbox.addEventListener('change', togglePointsIncluded);
    }
    
    // 클릭 외부 영역 클릭 시 드롭다운 닫기
    document.addEventListener('click', function(event) {
        if (currentDropdown && !currentDropdown.contains(event.target)) {
            const trigger = event.target.closest('[onclick*="toggleDropdown"]');
            if (!trigger) {
                currentDropdown.style.display = 'none';
                currentDropdown = null;
            }
        }
    });
});

// 전역 변수들도 window에 등록
window.PRODUCT_PRICES = PRODUCT_PRICES;
window.PRODUCT_POINTS = PRODUCT_POINTS;
window.orderItems = orderItems;
window.isPointsIncluded = isPointsIncluded;

console.log('독일피엠학교 Script.js 로드 완료 - 모든 함수 전역 등록됨');