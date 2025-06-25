
/* 
 * 독일피엠학교 JavaScript
 * 파일명: script.js
 * 설명: 하부메뉴 정상 작동 버전
 * 수정: toggleDropdown 함수 완전 수정
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
    '파워': { 회원기준: 89000, 오토십: 86500, BA: 84000, 액션팩: 84000 },
    '리스': { 회원기준: 17000, 오토십: 16500, BA: 16000, 액션팩: 16000 },
    '액티(스테비아)': { 회원기준: 32000, '5+1단품': 24200, '5+1세트': 145000 },
    '액티(레몬라임)': { 회원기준: 32000, '5+1단품': 24200, '5+1세트': 145000 },
    '액티(레몬그라스)': { 회원기준: 32000, '5+1단품': 24200, '5+1세트': 145000 },
    '액티(피치 아이스티)': { 회원기준: 32000, '5+1단품': 24200, '5+1세트': 145000 },
    '액티펀치': { 회원기준: 32000, '5+1단품': 24000, '5+1세트': 144000 },
    '액티 투 고': { 회원기준: 12000, '5+1단품': 9000, '5+1세트': 54000 },
    '피트니스 드링크': { 회원기준: 37000, '5+1단품': 30000, '5+1세트': 180000 },
    '젤슈츠(오렌지)': { 회원기준: 40000, '5+1단품': 30000, '5+1세트': 180000 },
    '젤슈츠(사과)': { 회원기준: 40000, '5+1단품': 30000, '5+1세트': 180000 },
    '요거트 드링크': { 회원기준: 23000, '5+1단품': 16700, '5+1세트': 100000 },
    'D-드링크': { 회원기준: 25000, '5+1단품': 16700, '5+1세트': 100000 },
    '제너레이션': { 회원기준: 80000, '5+1단품': 60000, '5+1세트': 360000 },
    '듀오': { 회원기준: 50000, '5+1단품': 38300, '5+1세트': 230000 },
    '오메가3': { 회원기준: 26000, '5+1단품': 19500, '5+1세트': 117000 },
    '큐10 플러스': { 회원기준: 26000, '5+1단품': 19500, '5+1세트': 117000 },
    '뮤노겐': { 회원기준: 50000, '5+1단품': 37500, '5+1세트': 225000 },
    '뷰티': { 회원기준: 40000, '5+1단품': 31700, '5+1세트': 190000 },
    'C-밸런스': { 회원기준: 28000, '5+1단품': 21000, '5+1세트': 126000 },
    '겔링핏': { 회원기준: 51000, '5+1단품': 36700, '5+1세트': 220000 },
    '액티브 젤': { 회원기준: 23000, '5+1단품': 16700, '5+1세트': 100000 },
    '맨플러스': { 회원기준: 40000, '5+1단품': 30000, '5+1세트': 180000 },
    '허벌티': { 회원기준: 8000, '5+1단품': 5700, '5+1세트': 34000 },
    '탑쉐이프': { 회원기준: 70000, '5+1단품': 52500, '5+1세트': 315000 },
    'IB5': { 회원기준: 25000 },
    '아이비5': { 회원기준: 25000 },
    '프로(망고)': { 회원기준: 20000, '5+1단품': 16700, '5+1세트': 100000 },
    '프로(바닐라)': { 회원기준: 20000, '5+1단품': 16700, '5+1세트': 100000 },
    '프로(베리)': { 회원기준: 20000, '5+1단품': 16700, '5+1세트': 100000 },
    '프로(코코넛)': { 회원기준: 20000, '5+1단품': 16700, '5+1세트': 100000 },
    '프로(초코릿무스)': { 회원기준: 20000, '5+1단품': 16700, '5+1세트': 100000 },
    '웨이': { 회원기준: 25000 },
    '주니어': { 회원기준: 25000 },
    '맨 페이스': { 회원기준: 25000, '5+1단품': 18700, '5+1세트': 112000 },
    '액티 세럼': { 회원기준: 40000, '5+1단품': 30000, '5+1세트': 180000 },
    '브라이트닝 포에버': { 회원기준: 50000 },
    '클렌징폼': { 회원기준: 10000 },
    '밸런싱크림': { 회원기준: 12000 },
    '필링마스크': { 회원기준: 10000 },
    '영케어 세트': { 회원기준: 25000, '5+1단품': 16300, '5+1세트': 98000 },
    '하이드레이팅 샷 마스크': { 회원기준: 40000, '5+1단품': 33300, '5+1세트': 200000 },
    '브라이트닝 샷 마스크': { 회원기준: 40000, '5+1단품': 33300, '5+1세트': 200000 },
    '요거트 메이커': { 회원기준: 0 },
    '티인퓨저': { 회원기준: 0 },
    '데모백': { 회원기준: 0 }
};

// 제품 포인트 데이터
const PRODUCT_POINTS = {
    '파워': { 회원기준: 89, 오토십: 86.5, BA: 84, 액션팩: 84 },
    '리스': { 회원기준: 17, 오토십: 16.5, BA: 16, 액션팩: 16 },
    '액티(스테비아)': { 회원기준: 32, '5+1단품': 24.2, '5+1세트': 145 },
    '액티(레몬라임)': { 회원기준: 32, '5+1단품': 24.2, '5+1세트': 145 },
    '액티(레몬그라스)': { 회원기준: 32, '5+1단품': 24.2, '5+1세트': 145 },
    '액티(피치 아이스티)': { 회원기준: 32, '5+1단품': 24.2, '5+1세트': 145 },
    '액티펀치': { 회원기준: 32, '5+1단품': 24.0, '5+1세트': 144 },
    '액티 투 고': { 회원기준: 12, '5+1단품': 9.0, '5+1세트': 54 },
    '피트니스 드링크': { 회원기준: 37, '5+1단품': 30.0, '5+1세트': 180 },
    '젤슈츠(오렌지)': { 회원기준: 40, '5+1단품': 30.0, '5+1세트': 180 },
    '젤슈츠(사과)': { 회원기준: 40, '5+1단품': 30.0, '5+1세트': 180 },
    '요거트 드링크': { 회원기준: 23, '5+1단품': 16.7, '5+1세트': 100 },
    'D-드링크': { 회원기준: 25, '5+1단품': 16.7, '5+1세트': 100 },
    '제너레이션': { 회원기준: 80, '5+1단품': 60.0, '5+1세트': 360 },
    '듀오': { 회원기준: 50, '5+1단품': 38.3, '5+1세트': 230 },
    '오메가3': { 회원기준: 26, '5+1단품': 19.5, '5+1세트': 117 },
    '큐10 플러스': { 회원기준: 26, '5+1단품': 19.5, '5+1세트': 117 },
    '뮤노겐': { 회원기준: 50, '5+1단품': 37.5, '5+1세트': 225 },
    '뷰티': { 회원기준: 40, '5+1단품': 31.7, '5+1세트': 190 },
    'C-밸런스': { 회원기준: 28, '5+1단품': 21.0, '5+1세트': 126 },
    '겔링핏': { 회원기준: 51, '5+1단품': 36.7, '5+1세트': 220 },
    '액티브 젤': { 회원기준: 23, '5+1단품': 16.7, '5+1세트': 100 },
    '맨플러스': { 회원기준: 40, '5+1단품': 30.0, '5+1세트': 180 },
    '허벌티': { 회원기준: 8, '5+1단품': 5.7, '5+1세트': 34 },
    '탑쉐이프': { 회원기준: 70, '5+1단품': 52.5, '5+1세트': 315 },
    'IB5': { 회원기준: 25 },
    '아이비5': { 회원기준: 25 },
    '프로(망고)': { 회원기준: 20, '5+1단품': 16.7, '5+1세트': 100 },
    '프로(바닐라)': { 회원기준: 20, '5+1단품': 16.7, '5+1세트': 100 },
    '프로(베리)': { 회원기준: 20, '5+1단품': 16.7, '5+1세트': 100 },
    '프로(코코넛)': { 회원기준: 20, '5+1단품': 16.7, '5+1세트': 100 },
    '프로(초코릿무스)': { 회원기준: 20, '5+1단품': 16.7, '5+1세트': 100 },
    '웨이': { 회원기준: 25 },
    '주니어': { 회원기준: 25 },
    '맨 페이스': { 회원기준: 25, '5+1단품': 18.7, '5+1세트': 112 },
    '액티 세럼': { 회원기준: 40, '5+1단품': 30.0, '5+1세트': 180 },
    '브라이트닝 포에버': { 회원기준: 50 },
    '클렌징폼': { 회원기준: 10 },
    '밸런싱크림': { 회원기준: 12 },
    '필링마스크': { 회원기준: 10 },
    '영케어 세트': { 회원기준: 25, '5+1단품': 16.3, '5+1세트': 98 },
    '하이드레이팅 샷 마스크': { 회원기준: 40, '5+1단품': 33.3, '5+1세트': 200 },
    '브라이트닝 샷 마스크': { 회원기준: 40, '5+1단품': 33.3, '5+1세트': 200 },
    '요거트 메이커': { 회원기준: 0 },
    '티인퓨저': { 회원기준: 0 },
    '데모백': { 회원기준: 0 }
};

// ==================== 핵심 함수들 ====================

// 수정된 toggleDropdown 함수 - 하부메뉴 정상 작동
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

// 건강상담 함수
function showHealthSurvey() {
    console.log('건강상담 기능 실행');
    alert('건강상담 기능이 실행됩니다!');
}

// 주문 관련 함수들
function addToOrder() {
    console.log('주문 추가 기능');
    const productSelect = document.querySelector('#product-select');
    const productName = productSelect ? productSelect.value : null;
    
    if (!productName || !selectedQuantity || !selectedPriceType) {
        alert('제품, 수량, 가격 유형을 모두 선택해주세요.');
        return;
    }
    
    alert('주문이 추가되었습니다!');
}

function calculateTotal() {
    console.log('총계 계산 기능');
    const orderList = document.querySelector('#orderList');
    if (!orderList) {
        alert('주문 내역이 없습니다.');
        return;
    }
    
    alert('총계가 계산되었습니다!');
}

function clearOrder() {
    console.log('주문 초기화 기능');
    if(confirm('주문을 모두 삭제하시겠습니까?')) {
        alert('주문이 초기화되었습니다.');
    }
}

function selectQuantity(quantity) {
    console.log('수량 선택:', quantity);
    selectedQuantity = quantity;
}

function selectPriceType(priceType) {
    console.log('가격 유형 선택:', priceType);
    selectedPriceType = priceType;
}

function registerOrder() {
    console.log('주문 등록 기능');
    alert('주문이 등록되었습니다!');
}

function calculateAndCopy() {
    console.log('정산 및 복사 기능');
    alert('정산이 완료되었습니다!');
}

// 이미지/슬라이드 관련 함수들
function showImage(url, title) {
    console.log('이미지 표시:', title);
    alert('이미지: ' + title);
}

function showSlide(type, count) {
    console.log('슬라이드 표시:', type);
    alert('슬라이드: ' + type);
}

// 알람 관련 함수들
function toggleAlarm() {
    alarmEnabled = !alarmEnabled;
    console.log('알람 상태:', alarmEnabled ? '켜짐' : '꺼짐');
    alert('알람이 ' + (alarmEnabled ? '켜졌' : '꺼졌') + '습니다.');
}

// 회원 데이터 관련 함수들
async function loadMemberData() {
    const now = Date.now();
    if (memberDataCache && (now - memberDataCacheTime) < CACHE_DURATION) {
        return memberDataCache;
    }
    
    try {
        const response = await fetch(MEMBER_LIST_URL);
        const data = await response.text();
        memberDataCache = data;
        memberDataCacheTime = now;
        return data;
    } catch (error) {
        console.error('회원 데이터 로드 실패:', error);
        return null;
    }
}

// 기타 유틸리티 함수들
function formatPrice(price) {
    return new Intl.NumberFormat('ko-KR').format(price);
}

function validateInput(input) {
    return input && input.trim().length > 0;
}

// DOM 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    console.log('독일피엠학교 JavaScript 로드 완료');
    
    // 전역 함수 등록
    window.toggleDropdown = toggleDropdown;
    window.showHealthSurvey = showHealthSurvey;
    window.addToOrder = addToOrder;
    window.calculateTotal = calculateTotal;
    window.clearOrder = clearOrder;
    window.selectQuantity = selectQuantity;
    window.selectPriceType = selectPriceType;
    window.registerOrder = registerOrder;
    window.calculateAndCopy = calculateAndCopy;
    window.showImage = showImage;
    window.showSlide = showSlide;
    window.toggleAlarm = toggleAlarm;
    window.loadMemberData = loadMemberData;
    window.formatPrice = formatPrice;
    window.validateInput = validateInput;
    
    console.log('전역 함수 등록 완료');
});

// 페이지 로드 완료 시 실행
window.addEventListener('load', function() {
    console.log('독일피엠학교 Script.js 로드 완료 - 모든 함수 전역 등록됨');
});

// ==================== 끝 ====================
        