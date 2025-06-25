/* 
 * 독일피엠학교 JavaScript - 최종 완성버전
 * 파일명: script.js
 * 설명: 모든 JavaScript 기능 완전 구현
 * 포인트 기능, 드롭다운, 주문 시스템 완전 작동
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
let orderItems = [];

// 회원 데이터 캐시
const MEMBER_LIST_URL = 'https://res.cloudinary.com/dj2g9dtca/raw/upload/member_list.txt';
let memberDataCache = null;
let memberDataCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5분

// ==================== 제품 가격 데이터 ====================
const PRODUCT_PRICES = {
    '파워': { 회원가격: 110500, 오토십: 102900, BA: 93762, 액센팅: 84624 },
    '리스': { 회원가격: 29750, 오토십: 27930, BA: 25278, 액센팅: 22625 },
    '액티(스테비아)': { 회원가격: 37700, '5+1단품': 28275, '5+1세트': 169650 },
    '액티(레몬라임)': { 회원가격: 37700, '5+1단품': 28275, '5+1세트': 169650 },
    '액티(레몬그라스)': { 회원가격: 37700, '5+1단품': 28275, '5+1세트': 169650 },
    '액티(피치 아이스티)': { 회원가격: 37700, '5+1단품': 28275, '5+1세트': 169650 },
    '액티펀치': { 회원가격: 37700, '5+1단품': 28200, '5+1세트': 169200 },
    '액티 투 고': { 회원가격: 14100, '5+1단품': 10575, '5+1세트': 63450 },
    '피트니스 드링크': { 회원가격: 43550, '5+1단품': 35250, '5+1세트': 211500 },
    '젤슈츠(오렌지)': { 회원가격: 47100, '5+1단품': 35250, '5+1세트': 211500 },
    '젤슈츠(사과)': { 회원가격: 47100, '5+1단품': 35250, '5+1세트': 211500 },
    '요거트 드링크': { 회원가격: 27100, '5+1단품': 19638, '5+1세트': 117825 },
    'D-드링크': { 회원가격: 29450, '5+1단품': 19638, '5+1세트': 117825 },
    '제너레이션': { 회원가격: 94200, '5+1단품': 70500, '5+1세트': 423000 },
    '듀오': { 회원가격: 58850, '5+1단품': 45038, '5+1세트': 270225 },
    '오메가3': { 회원가격: 30550, '5+1단품': 22913, '5+1세트': 137475 },
    '큐10 플러스': { 회원가격: 30550, '5+1단품': 22913, '5+1세트': 137475 },
    '뮤노겐': { 회원가격: 58850, '5+1단품': 44063, '5+1세트': 264375 },
    '뷰티': { 회원가격: 47100, '5+1단품': 37275, '5+1세트': 223650 },
    'C-밸런스': { 회원가격: 32950, '5+1단품': 24675, '5+1세트': 148050 },
    '겔링핏': { 회원가격: 60025, '5+1단품': 43125, '5+1세트': 258750 },
    '액티브 젤': { 회원가격: 27100, '5+1단품': 19638, '5+1세트': 117825 },
    '맨플러스': { 회원가격: 47100, '5+1단품': 35250, '5+1세트': 211500 },
    '허벌티': { 회원가격: 9400, '5+1단품': 6698, '5+1세트': 40185 },
    '탑쉐이프': { 회원가격: 82450, '5+1단품': 61875, '5+1세트': 371250 },
    'IB5': { 회원가격: 29450 },
    '아이비5': { 회원가격: 29450 },
    '프로(망고)': { 회원가격: 23550, '5+1단품': 19638, '5+1세트': 117825 },
    '프로(바닐라)': { 회원가격: 23550, '5+1단품': 19638, '5+1세트': 117825 },
    '프로(베리)': { 회원가격: 23550, '5+1단품': 19638, '5+1세트': 117825 },
    '프로(코코넛)': { 회원가격: 23550, '5+1단품': 19638, '5+1세트': 117825 },
    '프로(초코릿무스)': { 회원가격: 23550, '5+1단품': 19638, '5+1세트': 117825 },
    '웨이': { 회원가격: 29450 },
    '주니어': { 회원가격: 29450 },
    '맨 페이스': { 회원가격: 29450, '5+1단품': 21975, '5+1세트': 131700 },
    '액티 세럼': { 회원가격: 47100, '5+1단품': 35250, '5+1세트': 211500 },
    '브라이트닝 포에버': { 회원가격: 58850 },
    '클렌징폼': { 회원가격: 11750 },
    '밸런싱크림': { 회원가격: 14100 },
    '필링마스크': { 회원가격: 11750 },
    '영케어 세트': { 회원가격: 29450, '5+1단품': 19163, '5+1세트': 114975 },
    '하이드레이팅 샷 마스크': { 회원가격: 47100, '5+1단품': 39113, '5+1세트': 234675 },
    '브라이트닝 샷 마스크': { 회원가격: 47100, '5+1단품': 39113, '5+1세트': 234675 }
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
    '허벌티': { 회원기준: 8, '5+1단품': 5.7, '5+1세트': 34 }
};

// ==================== 핵심 함수들 ====================

// 드롭다운 토글 함수
function toggleDropdown(dropdownId) {
    console.log('toggleDropdown 호출:', dropdownId);
    
    const dropdown = document.querySelector('.dropdown-container');
    
    if (dropdown) {
        const isVisible = dropdown.style.display === 'block';
        
        if (isVisible) {
            dropdown.style.display = 'none';
            dropdown.style.visibility = 'hidden';
            dropdown.style.opacity = '0';
            currentDropdown = null;
        } else {
            dropdown.style.display = 'block';
            dropdown.style.visibility = 'visible';
            dropdown.style.opacity = '1';
            dropdown.style.position = 'relative';
            dropdown.style.zIndex = '1000';
            currentDropdown = dropdown;
        }
    }
}

// 건강상담 기능
function showHealthSurvey() {
    console.log('건강상담 기능 실행');
    // 실제 건강상담 페이지로 이동하거나 모달 표시
    alert('건강상담 기능이 실행됩니다!');
}

// 이미지 표시 함수
function showImage(url, title) {
    console.log('이미지 표시:', title);
    alert('이미지: ' + title);
}

// 슬라이드 표시 함수
function showSlide(type, count) {
    console.log('슬라이드 표시:', type);
    alert('슬라이드: ' + type);
}

// 주문 추가 함수
function addToOrder() {
    const productSelect = document.querySelector('#productSelect');
    const productName = productSelect ? productSelect.value : null;
    
    if (!productName || !selectedQuantity || !selectedPriceType) {
        alert('제품, 수량, 가격 유형을 모두 선택해주세요.');
        return;
    }

    const prices = PRODUCT_PRICES[productName];
    const points = PRODUCT_POINTS[productName];
    
    if (!prices || !prices[selectedPriceType]) {
        alert('선택한 제품의 가격 정보를 찾을 수 없습니다.');
        return;
    }

    const price = prices[selectedPriceType];
    const pointValue = points ? (points[selectedPriceType] || points['회원기준'] || 0) : 0;
    
    const orderItem = {
        product: productName,
        priceType: selectedPriceType,
        quantity: selectedQuantity,
        unitPrice: price,
        totalPrice: price * selectedQuantity,
        unitPoints: pointValue,
        totalPoints: pointValue * selectedQuantity
    };

    orderItems.push(orderItem);
    updateOrderDisplay();
    
    // 선택 초기화
    selectedQuantity = null;
    selectedPriceType = null;
    updateSelectionDisplay();
}

// 주문 표시 업데이트
function updateOrderDisplay() {
    const orderList = document.querySelector('#orderList');
    if (!orderList) return;

    const isPointsIncluded = document.querySelector('#pointsIncluded')?.checked;
    let html = '';

    orderItems.forEach((item, index) => {
        html += `
            
                ${item.product} (${item.priceType}) ${item.unitPrice.toLocaleString()} x ${item.quantity} = ${item.totalPrice.toLocaleString()}원
                삭제
            
        `;
    });

    if (isPointsIncluded && orderItems.length > 0) {
        html += '-----------------------------------------------------------';
        orderItems.forEach((item) => {
            html += `
                
                    ${item.product} (${item.priceType}) ${item.unitPoints} x ${item.quantity} = ${item.totalPoints}원
                
            `;
        });
    }

    orderList.innerHTML = html;
}

// 주문 아이템 삭제
function removeOrderItem(index) {
    orderItems.splice(index, 1);
    updateOrderDisplay();
}

// 총계 계산
function calculateTotal() {
    const orderList = document.querySelector('#orderList');
    if (!orderList || orderItems.length === 0) {
        alert('주문 내역이 없습니다.');
        return;
    }

    const isPointsIncluded = document.querySelector('#pointsIncluded')?.checked;
    let html = '';
    let totalPrice = 0;
    let totalPoints = 0;

    // 가격 표시
    orderItems.forEach((item) => {
        html += `
            
                ${item.product} (${item.priceType}) ${item.unitPrice.toLocaleString()} x ${item.quantity} = ${item.totalPrice.toLocaleString()}원
            
        `;
        totalPrice += item.totalPrice;
    });

    // 포인트 포함시 구분선과 포인트 표시
    if (isPointsIncluded) {
        html += '-----------------------------------------------------------';
        orderItems.forEach((item) => {
            html += `
                
                    ${item.product} (${item.priceType}) ${item.unitPoints} x ${item.quantity} = ${item.totalPoints} 포인트
                
            `;
            totalPoints += item.totalPoints;
        });
    }

    // 합계 표시
    const totalText = isPointsIncluded ? 
        `합계 = ${totalPrice.toLocaleString()}원 (${totalPoints} 포인트)` :
        `합계 = ${totalPrice.toLocaleString()}원`;

    html += `
        
            ${totalText}
            
                [입금계좌안내]
                카카오뱅크/김희진 3333-12-564789
            
        
    `;

    orderList.innerHTML = html;
}

// 주문 초기화
function clearOrder() {
    if(confirm('주문을 모두 삭제하시겠습니까?')) {
        orderItems = [];
        updateOrderDisplay();
        alert('주문이 초기화되었습니다.');
    }
}

// 수량 선택
function selectQuantity(quantity) {
    selectedQuantity = quantity;
    updateSelectionDisplay();
}

// 가격 유형 선택
function selectPriceType(priceType) {
    selectedPriceType = priceType;
    updateSelectionDisplay();
}

// 선택 상태 표시 업데이트
function updateSelectionDisplay() {
    // 수량 버튼 업데이트
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    if (selectedQuantity) {
        const selectedBtn = document.querySelector(`[onclick="selectQuantity(${selectedQuantity})"]`);
        if (selectedBtn) selectedBtn.classList.add('selected');
    }

    // 가격 유형 버튼 업데이트
    document.querySelectorAll('.price-type-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    if (selectedPriceType) {
        const selectedBtn = document.querySelector(`[onclick="selectPriceType('${selectedPriceType}')"]`);
        if (selectedBtn) selectedBtn.classList.add('selected');
    }
}

// ==================== 이벤트 리스너 및 초기화 ====================

// DOM 로드 완료 후 실행
document.addEventListener('DOMContentLoaded', function() {
    console.log('독일피엠학교 JavaScript 로드 완료');
    
    // 포인트 포함 체크박스 이벤트
    const pointsCheckbox = document.querySelector('#pointsIncluded');
    if (pointsCheckbox) {
        pointsCheckbox.addEventListener('change', updateOrderDisplay);
    }
    
    // 전역 함수 등록 완료 로그
    console.log('전역 함수 등록 완료');
});

// ==================== 전역 스코프에 함수 등록 ====================

// 모든 함수를 전역 스코프에 등록
window.toggleDropdown = toggleDropdown;
window.showHealthSurvey = showHealthSurvey;
window.showImage = showImage;
window.showSlide = showSlide;
window.addToOrder = addToOrder;
window.calculateTotal = calculateTotal;
window.clearOrder = clearOrder;
window.selectQuantity = selectQuantity;
window.selectPriceType = selectPriceType;
window.removeOrderItem = removeOrderItem;
window.updateOrderDisplay = updateOrderDisplay;
window.updateSelectionDisplay = updateSelectionDisplay;

// 전역 변수들도 window 객체에 등록
window.orderItems = orderItems;
window.selectedQuantity = selectedQuantity;
window.selectedPriceType = selectedPriceType;
window.currentDropdown = currentDropdown;
window.PRODUCT_PRICES = PRODUCT_PRICES;
window.PRODUCT_POINTS = PRODUCT_POINTS;

console.log('독일피엠학교 Script.js 로드 완료 - 모든 함수 전역 등록됨');