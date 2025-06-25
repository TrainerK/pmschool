/* 
 * 독일피엠학교 JavaScript
 * 파일명: script.js
 * 설명: 모든 JavaScript 기능 구현 (포인트 기능 포함)
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

// 제품 가격 데이터
const PRODUCT_PRICES = {
    '파워': { 회원기준: 124962, 오토십: 121443, BA: 93762, 액션팩: 93762 },
    '리스': { 회원기준: 33704, 오토십: 32757, BA: 25278, 액션팩: 25278 },
    '액티(스테비아)': { 회원기준: 53508, '5+1단품': 40446, '5+1세트': 242676 },
    '액티(레몬라임)': { 회원기준: 53508, '5+1단품': 40446, '5+1세트': 242676 },
    '액티(레몬그라스)': { 회원기준: 53508, '5+1단품': 40446, '5+1세트': 242676 },
    '액티(피치 아이스티)': { 회원기준: 53508, '5+1단품': 40446, '5+1세트': 242676 },
    '액티펀치': { 회원기준: 53508, '5+1단품': 40086, '5+1세트': 240516 },
    '액티 투 고': { 회원기준: 20058, '5+1단품': 15048, '5+1세트': 90288 },
    '피트니스 드링크': { 회원기준: 61842, '5+1단품': 50136, '5+1세트': 300816 },
    '젤슈츠(오렌지)': { 회원기준: 66888, '5+1단품': 50136, '5+1세트': 300816 },
    '젤슈츠(사과)': { 회원기준: 66888, '5+1단품': 50136, '5+1세트': 300816 },
    '요거트 드링크': { 회원기준: 38428, '5+1단품': 27894, '5+1세트': 167364 },
    'D-드링크': { 회원기준: 41775, '5+1단품': 27894, '5+1세트': 167364 },
    '제너레이션': { 회원기준: 133776, '5+1단품': 100344, '5+1세트': 602064 },
    '듀오': { 회원기준: 83610, '5+1단품': 64050, '5+1세트': 384300 },
    '오메가3': { 회원기준: 43464, '5+1단품': 32598, '5+1세트': 195588 },
    '큐10 플러스': { 회원기준: 43464, '5+1단품': 32598, '5+1세트': 195588 },
    '뮤노겐': { 회원기준: 83610, '5+1단품': 62640, '5+1세트': 375840 },
    '뷰티': { 회원기준: 66888, '5+1단품': 52962, '5+1세트': 317772 },
    'C-밸런스': { 회원기준: 46812, '5+1단품': 35070, '5+1세트': 210420 },
    '겔링핏': { 회원기준: 85302, '5+1단품': 61362, '5+1세트': 368172 },
    '액티브 젤': { 회원기준: 38428, '5+1단품': 27894, '5+1세트': 167364 },
    '맨플러스': { 회원기준: 66888, '5+1단품': 50136, '5+1세트': 300816 }
};

// 제품 포인트 데이터
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
let totalAmount = 0;
let totalPoints = 0;

// ==================== 드롭다운 함수 ====================

function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    
    // 다른 드롭다운 닫기
    allDropdowns.forEach(dd => {
        if (dd.id !== dropdownId) {
            dd.style.display = 'none';
        }
    });
    
    // 현재 드롭다운 토글
    if (dropdown) {
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
            currentDropdown = null;
        } else {
            dropdown.style.display = 'block';
            currentDropdown = dropdownId;
        }
    }
}

// 외부 클릭 시 드롭다운 닫기
document.addEventListener('click', function(event) {
    if (currentDropdown && !event.target.closest('.dropdown')) {
        document.getElementById(currentDropdown).style.display = 'none';
        currentDropdown = null;
    }
});

// ==================== 주문서 작성 기능 ====================

function addOrderItem() {
    const productSelect = document.getElementById('product-select');
    const quantityInput = document.getElementById('quantity-input');
    const priceTypeButtons = document.querySelectorAll('.price-type-btn.active');
    const pointIncludeCheckbox = document.getElementById('point-include');
    
    if (!productSelect.value || !quantityInput.value || priceTypeButtons.length === 0) {
        alert('제품, 수량, 가격 유형을 모두 선택해주세요.');
        return;
    }
    
    const productName = productSelect.value;
    const quantity = parseInt(quantityInput.value);
    const priceType = priceTypeButtons[0].textContent;
    const includePoints = pointIncludeCheckbox.checked;
    
    // 가격 계산
    const productPrice = PRODUCT_PRICES[productName];
    const productPoint = PRODUCT_POINTS[productName];
    
    if (!productPrice) {
        alert('선택한 제품의 가격 정보를 찾을 수 없습니다.');
        return;
    }
    
    let unitPrice = productPrice[priceType] || productPrice['회원기준'];
    let unitPoint = 0;
    
    if (includePoints && productPoint) {
        unitPoint = productPoint[priceType] || productPoint['회원기준'] || 0;
    }
    
    const totalPrice = unitPrice * quantity;
    const totalPointsForItem = unitPoint * quantity;
    
    // 주문 항목 추가
    const orderItem = {
        product: productName,
        priceType: priceType,
        quantity: quantity,
        unitPrice: unitPrice,
        totalPrice: totalPrice,
        unitPoint: unitPoint,
        totalPoints: totalPointsForItem,
        includePoints: includePoints
    };
    
    orderItems.push(orderItem);
    updateOrderDisplay();
    
    // 입력 필드 초기화
    quantityInput.value = '';
    document.querySelectorAll('.price-type-btn').forEach(btn => btn.classList.remove('active'));
}

function updateOrderDisplay() {
    const orderList = document.getElementById('order-list');
    let html = '';
    let totalOrderAmount = 0;
    let totalOrderPoints = 0;
    
    // 일반 주문 항목들
    orderItems.forEach((item, index) => {
        html += `
            ${item.product} (${item.priceType}) ${item.unitPrice.toLocaleString()} x ${item.quantity} = ${item.totalPrice.toLocaleString()}원
            삭제
        `;
        totalOrderAmount += item.totalPrice;
    });
    
    // 포인트 포함 체크된 항목이 있으면 구분선과 포인트 표시
    const pointItems = orderItems.filter(item => item.includePoints && item.unitPoint > 0);
    if (pointItems.length > 0) {
        html += '-----------------------------------------------------------';
        
        pointItems.forEach(item => {
            html += `
                ${item.product} (${item.priceType}) ${item.unitPoint} x ${item.quantity} = ${item.totalPoints}원
            `;
            totalOrderPoints += item.totalPoints;
        });
    }
    
    orderList.innerHTML = html;
    totalAmount = totalOrderAmount;
    totalPoints = totalOrderPoints;
}

function removeOrderItem(index) {
    orderItems.splice(index, 1);
    updateOrderDisplay();
}

function calculateTotal() {
    if (orderItems.length === 0) {
        alert('주문 항목이 없습니다.');
        return;
    }
    
    const orderList = document.getElementById('order-list');
    let html = '';
    let totalOrderAmount = 0;
    let totalOrderPoints = 0;
    
    // 일반 주문 항목들
    orderItems.forEach(item => {
        html += `
            ${item.product} (${item.priceType}) ${item.unitPrice.toLocaleString()} x ${item.quantity} = ${item.totalPrice.toLocaleString()}원
        `;
        totalOrderAmount += item.totalPrice;
    });
    
    // 포인트 포함 체크된 항목이 있으면 구분선과 포인트 표시
    const pointItems = orderItems.filter(item => item.includePoints && item.unitPoint > 0);
    if (pointItems.length > 0) {
        html += '-----------------------------------------------------------';
        
        pointItems.forEach(item => {
            html += `
                ${item.product} (${item.priceType}) ${item.unitPoint} x ${item.quantity} = ${item.totalPoints} 포인트
            `;
            totalOrderPoints += item.totalPoints;
        });
    }
    
    // 합계 표시
    if (totalOrderPoints > 0) {
        html += `
            합계 = ${totalOrderAmount.toLocaleString()}원 (${totalOrderPoints} 포인트)
        `;
    } else {
        html += `
            합계 = ${totalOrderAmount.toLocaleString()}원
        `;
    }
    
    // 입금 계좌 안내
    html += `
        [입금계좌안내]
        카카오뱅크/김희진 3333-12-564789
    `;
    
    orderList.innerHTML = html;
}

// ==================== 가격 유형 버튼 처리 ====================

function selectPriceType(button) {
    document.querySelectorAll('.price-type-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// ==================== 초기화 함수 ====================

function resetOrder() {
    orderItems = [];
    totalAmount = 0;
    totalPoints = 0;
    document.getElementById('order-list').innerHTML = '';
    document.getElementById('product-select').value = '';
    document.getElementById('quantity-input').value = '';
    document.querySelectorAll('.price-type-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById('point-include').checked = false;
}

// ==================== 슬라이드 기능 ====================

function showSlide(type, programName, slideIndex = 1) {
    currentSlideType = type;
    currentProgramName = programName;
    currentSlideIndex = slideIndex;
    
    // 슬라이드 관련 로직
    console.log(`Showing slide: ${type} - ${programName} - ${slideIndex}`);
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

// ==================== 기타 유틸리티 함수 ====================

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showNotification(message, type = 'info') {
    console.log(`${type.toUpperCase()}: ${message}`);
}

// ==================== 초기화 ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('독일피엠학교 JavaScript 로드 완료');
    
    // 가격 유형 버튼 이벤트 리스너
    document.querySelectorAll('.price-type-btn').forEach(button => {
        button.addEventListener('click', function() {
            selectPriceType(this);
        });
    });
    
    // 등록 버튼 이벤트 리스너
    const addButton = document.getElementById('add-order-btn');
    if (addButton) {
        addButton.addEventListener('click', addOrderItem);
    }
    
    // 정산 버튼 이벤트 리스너
    const calculateButton = document.getElementById('calculate-btn');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateTotal);
    }
    
    // 초기화 버튼 이벤트 리스너
    const resetButton = document.getElementById('reset-btn');
    if (resetButton) {
        resetButton.addEventListener('click', resetOrder);
    }
});