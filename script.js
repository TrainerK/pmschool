/* * 독일피엠학교 JavaScript * 파일명: script.js * 설명: 모든 JavaScript 기능 구현 (포인트 기능 완성) * 의존성: styles.css */

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

// 제품 가격 데이터
const PRODUCT_PRICES = {
    '파워': { 회원기준: 108262, 오토십: 105537, BA: 93762, 액션팩: 93762 },
    '리스': { 회원기준: 29243, 오토십: 28505, BA: 25278, 액션팩: 25278 },
    // ... 기존 가격 데이터들
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

// 주문 관련 전역 변수
let orderItems = [];
let isPointIncluded = false;

// ==================== 포인트 계산 함수 ====================

/**
 * 제품의 포인트를 가져오는 함수
 * @param {string} productName - 제품명
 * @param {string} priceType - 가격 유형
 * @returns {number} - 포인트 값
 */
function getProductPoints(productName, priceType) {
    const productPoints = PRODUCT_POINTS[productName];
    if (!productPoints) return 0;
    
    return productPoints[priceType] || 0;
}

/**
 * 포인트 포함 체크박스 상태를 업데이트하는 함수
 */
function updatePointIncludeStatus() {
    const pointCheckbox = document.querySelector('#point-include-checkbox');
    if (pointCheckbox) {
        isPointIncluded = pointCheckbox.checked;
    }
}

/**
 * 주문 항목을 등록하는 함수 (포인트 기능 포함)
 */
function registerOrderItem() {
    const productSelect = document.querySelector('#product-select');
    const quantityInput = document.querySelector('#quantity-input');
    const priceTypeButtons = document.querySelectorAll('.price-type-btn');
    
    if (!productSelect || !quantityInput) return;
    
    const productName = productSelect.value;
    const quantity = parseInt(quantityInput.value) || 1;
    let selectedPriceType = null;
    
    // 선택된 가격 유형 찾기
    priceTypeButtons.forEach(btn => {
        if (btn.classList.contains('selected')) {
            selectedPriceType = btn.textContent.trim();
        }
    });
    
    if (!productName || !selectedPriceType) {
        alert('제품과 가격 유형을 선택해주세요.');
        return;
    }
    
    // 가격 정보 가져오기
    const productPrices = PRODUCT_PRICES[productName];
    if (!productPrices) {
        alert('해당 제품의 가격 정보를 찾을 수 없습니다.');
        return;
    }
    
    const unitPrice = productPrices[selectedPriceType];
    if (!unitPrice) {
        alert('해당 가격 유형의 정보를 찾을 수 없습니다.');
        return;
    }
    
    const totalPrice = unitPrice * quantity;
    
    // 포인트 정보 가져오기
    const unitPoints = getProductPoints(productName, selectedPriceType);
    const totalPoints = unitPoints * quantity;
    
    // 주문 항목 객체 생성
    const orderItem = {
        productName,
        priceType: selectedPriceType,
        quantity,
        unitPrice,
        totalPrice,
        unitPoints,
        totalPoints
    };
    
    // 주문 목록에 추가
    orderItems.push(orderItem);
    
    // 포인트 포함 상태 업데이트
    updatePointIncludeStatus();
    
    // 화면 업데이트
    updateOrderDisplay();
    
    // 입력 필드 초기화
    resetInputFields();
}

/**
 * 주문 목록 화면 업데이트 함수
 */
function updateOrderDisplay() {
    const orderDisplayArea = document.querySelector('#order-display-area');
    if (!orderDisplayArea) return;
    
    let displayText = '';
    
    // 가격 정보 표시
    orderItems.forEach(item => {
        displayText += `${item.productName} (${item.priceType}) ${item.unitPrice.toLocaleString()} x ${item.quantity} = ${item.totalPrice.toLocaleString()}원\n`;
    });
    
    // 포인트 포함이 체크된 경우 포인트 정보도 표시
    if (isPointIncluded && orderItems.length > 0) {
        displayText += '\n-----------------------------------------------------------\n';
        orderItems.forEach(item => {
            if (item.unitPoints > 0) {
                displayText += `${item.productName} (${item.priceType}) ${item.unitPoints} x ${item.quantity} = ${item.totalPoints}원\n`;
            }
        });
    }
    
    orderDisplayArea.value = displayText;
}

/**
 * 정산 처리 함수
 */
function processCheckout() {
    if (orderItems.length === 0) {
        alert('주문할 제품을 먼저 등록해주세요.');
        return;
    }
    
    const orderDisplayArea = document.querySelector('#order-display-area');
    if (!orderDisplayArea) return;
    
    let displayText = '';
    let totalAmount = 0;
    let totalPoints = 0;
    
    // 가격 정보 표시
    orderItems.forEach(item => {
        displayText += `${item.productName} (${item.priceType}) ${item.unitPrice.toLocaleString()} x ${item.quantity} = ${item.totalPrice.toLocaleString()}원\n`;
        totalAmount += item.totalPrice;
    });
    
    // 포인트 포함이 체크된 경우
    if (isPointIncluded && orderItems.length > 0) {
        displayText += '\n-----------------------------------------------------------\n';
        orderItems.forEach(item => {
            if (item.unitPoints > 0) {
                displayText += `${item.productName} (${item.priceType}) ${item.unitPoints} x ${item.quantity} = ${item.totalPoints} 포인트\n`;
                totalPoints += item.totalPoints;
            }
        });
        
        displayText += `\n합계 = ${totalAmount.toLocaleString()}원 (${totalPoints} 포인트)\n`;
    } else {
        displayText += `\n합계 = ${totalAmount.toLocaleString()}원\n`;
    }
    
    // 계좌 정보 추가
    displayText += '[입금계좌안내]\n';
    displayText += '카카오뱅크/김희진 3333-12-564789';
    
    orderDisplayArea.value = displayText;
}

/**
 * 입력 필드 초기화 함수
 */
function resetInputFields() {
    const productSelect = document.querySelector('#product-select');
    const quantityInput = document.querySelector('#quantity-input');
    const priceTypeButtons = document.querySelectorAll('.price-type-btn');
    
    if (productSelect) productSelect.selectedIndex = 0;
    if (quantityInput) quantityInput.value = '1';
    
    priceTypeButtons.forEach(btn => {
        btn.classList.remove('selected');
    });
}

/**
 * 초기화 함수
 */
function resetOrder() {
    orderItems = [];
    isPointIncluded = false;
    
    const orderDisplayArea = document.querySelector('#order-display-area');
    if (orderDisplayArea) {
        orderDisplayArea.value = '';
    }
    
    const pointCheckbox = document.querySelector('#point-include-checkbox');
    if (pointCheckbox) {
        pointCheckbox.checked = false;
    }
    
    resetInputFields();
}

// ==================== 이벤트 리스너 설정 ====================

document.addEventListener('DOMContentLoaded', function() {
    // 등록 버튼 이벤트
    const registerBtn = document.querySelector('#register-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', registerOrderItem);
    }
    
    // 정산 버튼 이벤트
    const checkoutBtn = document.querySelector('#checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', processCheckout);
    }
    
    // 초기화 버튼 이벤트
    const resetBtn = document.querySelector('#reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetOrder);
    }
    
    // 포인트 포함 체크박스 이벤트
    const pointCheckbox = document.querySelector('#point-include-checkbox');
    if (pointCheckbox) {
        pointCheckbox.addEventListener('change', function() {
            updatePointIncludeStatus();
            updateOrderDisplay(); // 체크박스 상태 변경 시 화면 업데이트
        });
    }
    
    // 가격 유형 버튼 이벤트
    const priceTypeButtons = document.querySelectorAll('.price-type-btn');
    priceTypeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 기존 선택 해제
            priceTypeButtons.forEach(b => b.classList.remove('selected'));
            // 현재 버튼 선택
            this.classList.add('selected');
        });
    });
});

// ==================== 기존 기능들 유지 ====================

// 기존 script.js의 모든 함수들을 여기에 포함
// (드롭다운, 슬라이드, 알람, 설문조사 등의 기능들)

console.log('독일피엠학교 포인트 기능 완성 Script.js 로드 완료');
console.log('포함된 제품 포인트 데이터:', Object.keys(PRODUCT_POINTS).length + '개');
