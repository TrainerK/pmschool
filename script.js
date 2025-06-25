/*
 * 독일피엠학교 JavaScript
 * 파일명: script.js
 * 설명: 모든 JavaScript 기능 구현
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
    '파워': { 회원기준: 125000, 오토십: 107987, BA: 93762, 액션팩: 85948 },
    '리스': { 회원기준: 33700, 오토십: 29113, BA: 25278, 액션팩: 23172 },
    '액티(스테비아)': { 회원기준: 42600, '5+1 세트': 213000, '5+1 단품': 35500 },
    '액티(레몬라임)': { 회원기준: 42600, '5+1 세트': 213000, '5+1 단품': 35500 },
    '액티(레몬그라스)': { 회원기준: 42600, '5+1 세트': 213000, '5+1 단품': 35500 },
    '액티(피치 아이스티)': { 회원기준: 42600, '5+1 세트': 213000, '5+1 단품': 35500 },
    '액티펀치': { 회원기준: 42600, '5+1 세트': 213000, '5+1 단품': 35500 },
    '액티 투 고': { 회원기준: 58000, '5+1 세트': 290000, '5+1 단품': 48333 },
    '피트니스 드링크': { 회원기준: 59200, '5+1 세트': 296000, '5+1 단품': 49333 },
    '젤슈츠(오렌지)': { 회원기준: 60600, '5+1 세트': 303000, '5+1 단품': 50500 },
    '젤슈츠(사과)': { 회원기준: 60600, '5+1 세트': 303000, '5+1 단품': 50500 },
    '요거트 드링크': { 회원기준: 37000, '5+1 세트': 185000, '5+1 단품': 30833 },
    'D-드링크': { 회원기준: 46000, '5+1 세트': 230000, '5+1 단품': 38333 },
    '제너레이션': { 회원기준: 120300, '5+1 세트': 601500, '5+1 단품': 100250 },
    '듀오': { 회원기준: 84000, '5+1 세트': 420000, '5+1 단품': 70000 },
    '오메가3': { 회원기준: 46600, '5+1 세트': 233000, '5+1 단품': 38833 },
    '큐10 플러스': { 회원기준: 57600, '5+1 세트': 288000, '5+1 단품': 48000 },
    '뮤노겐': { 회원기준: 73500, '5+1 세트': 367500, '5+1 단품': 61250 },
    '뷰티': { 회원기준: 68400, '5+1 세트': 342000, '5+1 단품': 57000 },
    'C-밸런스': { 회원기준: 54480, '5+1 세트': 272400, '5+1 단품': 45400 },
    '겔링핏': { 회원기준: 84400, '5+1 세트': 422000, '5+1 단품': 70333 },
    '액티브 젤': { 회원기준: 37000, '5+1 세트': 185000, '5+1 단품': 30833 },
    '맨플러스': { 회원기준: 65800, '5+1 세트': 329000, '5+1 단품': 54833 },
    '허벌티': { 회원기준: 16400, '5+1 세트': 82000, '5+1 단품': 13667 },
    '탑쉐이프': { 회원기준: 120000, '5+1 세트': 600000, '5+1 단품': 100000 },
    '아이비5(IB5)': { 회원기준: 36900, '5+1 세트': 184500, '5+1 단품': 30750 },
    '프로(망고)': { 회원기준: 51000, '5+1 세트': 255000, '5+1 단품': 42500 },
    '프로(바닐라)': { 회원기준: 51000, '5+1 세트': 255000, '5+1 단품': 42500 },
    '프로(베리)': { 회원기준: 51000, '5+1 세트': 255000, '5+1 단품': 42500 },
    '프로(코코넛)': { 회원기준: 51000, '5+1 세트': 255000, '5+1 단품': 42500 },
    '프로(초코릿무스)': { 회원기준: 51000, '5+1 세트': 255000, '5+1 단품': 42500 },
    '웨이': { 회원기준: 69900 },
    '주니어': { 회원기준: 44400, '5+1 세트': 222000, '5+1 단품': 37000 }
};

// 슬라이드 데이터
const slideData = {
    'ba-event': { count: 5, baseUrl: IMG_BASE + IMG_V + 'BA-event-' },
    'special-event': { count: 3, baseUrl: IMG_BASE + IMG_V + 'special-event-' },
    'monthly-plan': { count: 3, baseUrl: IMG_BASE + IMG_V + 'MonthlyPlan-' },
    'warning': { count: 4, baseUrl: IMG_BASE + IMG_V + 'Warning-' },
    'price': { count: 35, baseUrl: IMG_BASE + IMG_V + 'price-' },
    'promotion': { count: 28, baseUrl: IMG_BASE + IMG_V + 'promotion-' },
    'pro-intake': { count: 2, baseUrl: IMG_BASE + IMG_V + 'howtotake-07' }
};

// ==================== 메인 네비게이션 함수 ====================

function goToMain() {
    const dropdowns = ['news', 'program', 'catalog', 'intake', 'order', 'group', 'alarm'];
    dropdowns.forEach(dropdown => {
        const element = document.getElementById(dropdown + '-dropdown');
        if (element) element.classList.remove('show');
    });
    
    closeAuthModal();
    closeHealthSurvey();
    closePopup();
    closeSlide();
    closeAlarmSoundModal();
    
    window.scrollTo({top: 0, behavior: 'smooth'});
    currentDropdown = null;
}

function toggleDropdown(type) {
    const dropdowns = ['news', 'program', 'catalog', 'intake', 'order', 'group', 'alarm'];
    const targetDropdown = document.getElementById(type + '-dropdown');
    
    dropdowns.forEach(dropdown => {
        if (dropdown !== type) {
            const element = document.getElementById(dropdown + '-dropdown');
            if (element) {
                element.classList.remove('show');
            }
        }
    });
    
    if (targetDropdown) {
        if (currentDropdown === type && targetDropdown.classList.contains('show')) {
            targetDropdown.classList.remove('show');
            currentDropdown = null;
        } else {
            targetDropdown.classList.add('show');
            currentDropdown = type;
        }
    }
}

// ==================== 이미지 및 슬라이드 함수 ====================

function showImage(src, title) {
    const popup = document.getElementById('popup-overlay');
    const image = document.getElementById('popup-image');
    image.src = src;
    image.alt = title;
    popup.style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup-overlay').style.display = 'none';
}

function showSlide(type, count) {
    currentSlideType = type;
    totalSlides = count;
    currentSlideIndex = 1;
    
    const container = document.getElementById('slide-images-container');
    container.innerHTML = '';
    
    const data = slideData[type];
    if (data) {
        for (let i = 1; i <= count; i++) {
            const img = document.createElement('img');
            img.className = 'slide-image' + (i === 1 ? ' active' : '');
            img.alt = `${type} ${i}`;
            
            if (type === 'pro-intake') {
                img.src = i === 1 ? 
                    IMG_BASE + IMG_V + 'howtotake-07.png' :
                    IMG_BASE + IMG_V + 'howtotake-071.png';
            } else if (type === 'price' || type === 'promotion') {
                img.src = `${data.baseUrl}${i < 10 ? '0' + i : i}.png`;
            } else {
                img.src = `${data.baseUrl}${i}.png`;
            }
            
            container.appendChild(img);
        }
    }
    
    updateSlideIndicator();
    document.getElementById('slide-overlay').style.display = 'flex';
}

function nextSlide() {
    currentSlideIndex = currentSlideIndex >= totalSlides ? 1 : currentSlideIndex + 1;
    updateSlideDisplay();
}

function prevSlide() {
    currentSlideIndex = currentSlideIndex <= 1 ? totalSlides : currentSlideIndex - 1;
    updateSlideDisplay();
}

function updateSlideDisplay() {
    const images = document.querySelectorAll('.slide-image');
    images.forEach((img, index) => {
        img.classList.toggle('active', index === currentSlideIndex - 1);
    });
    updateSlideIndicator();
}

function updateSlideIndicator() {
    document.getElementById('slide-indicator').textContent = `${currentSlideIndex} / ${totalSlides}`;
}

function closeSlide() {
    document.getElementById('slide-overlay').style.display = 'none';
}

// ==================== 회원 인증 시스템 ====================

async function fetchMemberData() {
    const now = new Date().getTime();
    
    if (memberDataCache && (now - memberDataCacheTime) < CACHE_DURATION) {
        return memberDataCache;
    }
    
    try {
        const response = await fetch(`${MEMBER_LIST_URL}?t=${now}`);
        if (!response.ok) throw new Error('회원정보를 불러올 수 없습니다.');
        
        const text = await response.text();
        const memberData = {};
        
        text.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .forEach(line => {
                const [id, password] = line.split(',');
                if (id && password && /^\d{7,8}$/.test(id.trim())) {
                    memberData[id.trim()] = password.trim();
                }
            });
        
        memberDataCache = memberData;
        memberDataCacheTime = now;
        return memberData;
    } catch (error) {
        const defaultData = {
            '7919915': 'pms0586',
            '7963475': 'pms2958',
            '8201555': 'pms2958',
            '21151164': 'pms4082',
            '21136656': 'pms8745'
        };
        memberDataCache = defaultData;
        memberDataCacheTime = now;
        return defaultData;
    }
}

function checkMemberAuth(itemName) {
    currentProgramName = itemName;
    if (isLoggedIn) {
        showProgramContent(itemName);
    } else {
        showAuthModal();
    }
}

function showAuthModal() {
    const modal = document.getElementById('auth-modal');
    const idInput = document.getElementById('member-id');
    const passwordInput = document.getElementById('member-password');
    const message = document.getElementById('auth-message');
    
    idInput.value = '';
    passwordInput.value = '';
    message.textContent = '';
    modal.style.display = 'flex';
    
    setTimeout(() => idInput.focus(), 300);
    
    idInput.oninput = function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 8) {
            this.value = this.value.slice(0, 8);
        }
    };
    
    idInput.onkeypress = function(e) {
        if (e.key === 'Enter') passwordInput.focus();
    };
    
    passwordInput.onkeypress = function(e) {
        if (e.key === 'Enter') verifyMemberAuth();
    };
}

async function verifyMemberAuth() {
    const idInput = document.getElementById('member-id');
    const passwordInput = document.getElementById('member-password');
    const message = document.getElementById('auth-message');
    const memberId = idInput.value.trim();
    const memberPassword = passwordInput.value.trim();
    
    if (!memberId) {
        message.textContent = '회원번호를 입력해주세요.';
        message.className = 'auth-message auth-error';
        idInput.focus();
        return;
    }
    
    if (memberId.length < 7 || memberId.length > 8) {
        message.textContent = '회원번호는 7-8자리 숫자입니다.';
        message.className = 'auth-message auth-error';
        idInput.focus();
        return;
    }
    
    if (!memberPassword) {
        message.textContent = '비밀번호를 입력해주세요.';
        message.className = 'auth-message auth-error';
        passwordInput.focus();
        return;
    }
    
    message.textContent = '인증 정보를 확인하고 있습니다...';
    message.className = 'auth-message auth-loading';
    
    try {
        const memberData = await fetchMemberData();
        
        if (memberData[memberId] && memberData[memberId] === memberPassword) {
            message.textContent = '인증되었습니다! 잠시만 기다려주세요...';
            message.className = 'auth-message auth-success';
            
            isLoggedIn = true;
            updateAuthButton();
            
            setTimeout(() => {
                closeAuthModal();
                showProgramContent(currentProgramName);
            }, 1000);
        } else {
            message.textContent = '회원번호 또는 비밀번호가 일치하지 않습니다.';
            message.className = 'auth-message auth-error';
            
            setTimeout(() => {
                message.textContent = '';
                idInput.value = '';
                passwordInput.value = '';
                idInput.focus();
            }, 3000);
        }
    } catch (error) {
        message.textContent = '인증 확인 중 오류가 발생했습니다. 다시 시도해주세요.';
        message.className = 'auth-message auth-error';
        setTimeout(() => {
            message.textContent = '';
            idInput.focus();
        }, 3000);
    }
}

function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
}

function showProgramContent(programName) {
    if (programName === '해독 프로그램') {
        showImage(IMG_BASE + 'plan-dtox-01', '해독 프로그램 안내');
    } else {
        alert(`${programName} 콘텐츠에 접근하였습니다.`);
    }
}

function handleAuthStatus() {
    if (isLoggedIn) {
        logout();
    } else {
        showAuthModal();
    }
}

function logout() {
    isLoggedIn = false;
    updateAuthButton();
    
    const dropdowns = ['news', 'program', 'catalog', 'intake', 'order', 'group', 'alarm'];
    dropdowns.forEach(dropdown => {
        const element = document.getElementById(dropdown + '-dropdown');
        if (element) element.classList.remove('show');
    });
    
    closeAuthModal();
    closeHealthSurvey();
    closePopup();
    closeSlide();
    closeAlarmSoundModal();
    
    currentDropdown = null;
    alert('로그아웃되었습니다.');
}

function updateAuthButton() {
    const btn = document.getElementById('auth-status-btn');
    if (isLoggedIn) {
        btn.textContent = '로그아웃';
        btn.className = 'auth-status-btn logout';
    } else {
        btn.textContent = '로그인';
        btn.className = 'auth-status-btn';
    }
}

// ==================== 주문 시스템 ====================

function toggleQuantityDropdown() {
    const dropdown = document.getElementById('quantity-dropdown');
    dropdown.classList.toggle('show');
}

function selectQuantity(quantity) {
    selectedQuantity = quantity;
    document.getElementById('quantity-button').textContent = `수량: ${quantity}`;
    document.getElementById('quantity-dropdown').classList.remove('show');
    calculatePrice();
}

function selectPriceType(priceType) {
    document.querySelectorAll('.price-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    selectedPriceType = priceType;
    calculatePrice();
}

function calculatePrice() {
    const productSelect = document.getElementById('product-select');
    const selectedProduct = productSelect.value;
    const subtotalDisplay = document.getElementById('subtotal-display');
    
    if (selectedProduct && selectedQuantity && selectedPriceType) {
        const productData = PRODUCT_PRICES[selectedProduct];
        if (productData && productData[selectedPriceType]) {
            const unitPrice = productData[selectedPriceType];
            const total = unitPrice * selectedQuantity;
            subtotalDisplay.textContent = `${total.toLocaleString()}원`;
        } else {
            subtotalDisplay.textContent = '해당 가격 없음';
        }
    } else {
        subtotalDisplay.textContent = '소계';
    }
}

function registerOrder() {
    const productSelect = document.getElementById('product-select');
    const selectedProduct = productSelect.value;
    const orderTextbox = document.getElementById('order-textbox');
    
    if (!selectedProduct || !selectedQuantity || !selectedPriceType) {
        alert('제품, 수량, 가격기준을 모두 선택해주세요.');
        return;
    }
    
    const productData = PRODUCT_PRICES[selectedProduct];
    if (!productData || !productData[selectedPriceType]) {
        alert('선택한 제품에 해당 가격기준이 없습니다.');
        return;
    }
    
    const unitPrice = productData[selectedPriceType];
    const total = unitPrice * selectedQuantity;
    const orderLine = `${selectedProduct} (${selectedPriceType}) ${unitPrice.toLocaleString()} x ${selectedQuantity} = ${total.toLocaleString()}원`;
    
    if (orderTextbox.value) {
        orderTextbox.value += '\n' + orderLine;
    } else {
        orderTextbox.value = orderLine;
    }
    
    productSelect.value = '';
    selectedQuantity = null;
    selectedPriceType = null;
    document.getElementById('quantity-button').textContent = '수량';
    document.querySelectorAll('.price-button').forEach(btn => {
        btn.classList.remove('selected');
    });
    document.getElementById('subtotal-display').textContent = '소계';
}

function calculateAndCopy() {
    const orderTextbox = document.getElementById('order-textbox');
    const memoTextbox = document.getElementById('memo-textbox');
    
    if (!orderTextbox.value.trim()) {
        alert('등록된 주문이 없습니다.');
        return;
    }
    
    const lines = orderTextbox.value.split('\n');
    let total = 0;
    
    lines.forEach(line => {
        const match = line.match(/= ([\d,]+)원/);
        if (match) {
            const amount = parseInt(match[1].replace(/,/g, ''));
            total += amount;
        }
    });
    
    if (total === 0) {
        alert('계산할 금액이 없습니다.');
        return;
    }
    
    const memoContent = memoTextbox.value.trim();
    let finalContent = orderTextbox.value;
    
    finalContent += '\n\n합계 = ' + total.toLocaleString() + '원';
    if (memoContent) {
        finalContent += '\n' + memoContent;
    }
    
    orderTextbox.value = finalContent;
    
    try {
        navigator.clipboard.writeText(finalContent).then(() => {
            alert('정산 완료! 전체 내용이 클립보드에 복사되었습니다.');
        }).catch(() => {
            orderTextbox.select();
            document.execCommand('copy');
            alert('정산 완료! 전체 내용이 클립보드에 복사되었습니다.');
        });
    } catch (error) {
        orderTextbox.select();
        alert('정산 완료! 텍스트가 선택되었습니다. Ctrl+C로 복사해주세요.');
    }
}

function resetOrderList() {
    document.getElementById('order-textbox').value = '';
    alert('목록이 초기화되었습니다.');
}

// ==================== 알람 시스템 ====================

function toggleAlarm(state) {
    const onBtn = document.getElementById('alarm-on-btn');
    const offBtn = document.getElementById('alarm-off-btn');
    
    if (state === 'on') {
        alarmEnabled = true;
        onBtn.classList.add('active-on');
        offBtn.classList.remove('active-off');
        startAlarmCheck();
    } else {
        alarmEnabled = false;
        offBtn.classList.add('active-off');
        onBtn.classList.remove('active-on');
        stopAlarmCheck();
    }
}

function startAlarmCheck() {
    if (alarmInterval) clearInterval(alarmInterval);
    alarmInterval = setInterval(checkAlarmTime, 60000);
}

function stopAlarmCheck() {
    if (alarmInterval) {
        clearInterval(alarmInterval);
        alarmInterval = null;
    }
}

function checkAlarmTime() {
    if (!alarmEnabled) return;
    
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const alarmRows = document.querySelectorAll('.alarm-row');
    
    alarmRows.forEach(row => {
        const periodSelect = row.querySelector('.alarm-select:nth-child(1)').value;
        const hourSelect = row.querySelector('.alarm-select:nth-child(2)').value;
        const minuteSelect = row.querySelector('.alarm-select:nth-child(3)').value;
        const memoInput = row.querySelector('.alarm-input').value;
        
        if (periodSelect && hourSelect && minuteSelect) {
            let alarmHour = parseInt(hourSelect);
            if (periodSelect === '오후' && alarmHour !== 12) alarmHour += 12;
            if (periodSelect === '오전' && alarmHour === 12) alarmHour = 0;
            
            const alarmMinute = parseInt(minuteSelect);
            
            if (currentHour === alarmHour && currentMinute === alarmMinute) {
                triggerAlarm(memoInput || '알람 시간입니다!');
            }
        }
    });
}

function triggerAlarm(message) {
    playAlarmSound();
    
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
            new Notification('독일피엠학교 알람', {
                body: message,
                icon: '/favicon.ico'
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('독일피엠학교 알람', {
                        body: message,
                        icon: '/favicon.ico'
                    });
                }
            });
        }
    }
    
    if ('vibrate' in navigator) {
        navigator.vibrate([500, 200, 500, 200, 500]);
    }
}

function playAlarmSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (selectedAlarmSound === 'beep') {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } else if (selectedAlarmSound === 'bell') {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    
                    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.3);
                }, i * 400);
            }
        }
    } catch (error) {
        console.log('알람음 재생 실패:', error);
    }
}

function showAlarmSoundModal() {
    document.getElementById('alarm-sound-modal').style.display = 'flex';
}

function closeAlarmSoundModal() {
    document.getElementById('alarm-sound-modal').style.display = 'none';
}

function previewAlarmSound() {
    const selected = document.querySelector('input[name="alarm-sound"]:checked').value;
    selectedAlarmSound = selected;
    playAlarmSound();
}

function confirmAlarmSound() {
    const selected = document.querySelector('input[name="alarm-sound"]:checked').value;
    selectedAlarmSound = selected;
    alert('알람음이 설정되었습니다.');
    closeAlarmSoundModal();
}

function addAlarmRow() {
    const container = document.getElementById('alarm-rows-container');
    const newRow = document.createElement('div');
    newRow.className = 'alarm-row';
    newRow.innerHTML = `
        <select class="alarm-select">
            <option value="오전" selected>오전</option>
            <option value="오후">오후</option>
        </select>
        <select class="alarm-select">
            <option value="">시간</option>
            <option value="1시">1시</option>
            <option value="2시">2시</option>
            <option value="3시">3시</option>
            <option value="4시">4시</option>
            <option value="5시">5시</option>
            <option value="6시">6시</option>
            <option value="7시" selected>7시</option>
            <option value="8시">8시</option>
            <option value="9시">9시</option>
            <option value="10시">10시</option>
            <option value="11시">11시</option>
            <option value="12시">12시</option>
        </select>
        <select class="alarm-select">
            <option value="">분</option>
            <option value="00분" selected>00분</option>
            <option value="10분">10분</option>
            <option value="20분">20분</option>
            <option value="30분">30분</option>
            <option value="40분">40분</option>
            <option value="50분">50분</option>
        </select>
        <input type="text" class="alarm-input" placeholder="제품명 및 메모">
    `;
    container.appendChild(newRow);
}

// ==================== 건강설문 시스템 ====================

function showHealthSurvey() {
    currentSurveyPage = 1;
    updateSurveyPageDisplay();
    document.getElementById('health-survey-modal').style.display = 'flex';
}

function closeHealthSurvey() {
    document.getElementById('health-survey-modal').style.display = 'none';
}

function nextSurveyPage() {
    if (currentSurveyPage < totalSurveyPages) {
        currentSurveyPage++;
        updateSurveyPageDisplay();
    }
}

function prevSurveyPage() {
    if (currentSurveyPage > 1) {
        currentSurveyPage--;
        updateSurveyPageDisplay();
    }
}

function updateSurveyPageDisplay() {
    for (let i = 1; i <= totalSurveyPages; i++) {
        const page = document.getElementById(`survey-page-${i}`);
        if (page) {
            page.classList.toggle('active', i === currentSurveyPage);
        }
    }
    
    const prevBtn = document.querySelector('.survey-btn-prev');
    const nextBtn = document.querySelector('.survey-btn-next');
    
    if (prevBtn) prevBtn.disabled = currentSurveyPage === 1;
    if (nextBtn) {
        if (currentSurveyPage === totalSurveyPages) {
            nextBtn.textContent = '상담요청';
        } else {
            nextBtn.textContent = '다음';
        }
    }
}

function submitSurvey() {
    alert('문진표가 완료되었습니다. 상담 요청이 접수되었습니다. 감사합니다!');
    closeHealthSurvey();
}

// ==================== 이벤트 리스너 및 초기화 ====================

document.addEventListener('click', function(event) {
    const menuContainer = document.querySelector('.menu-container');
    const authModal = document.getElementById('auth-modal');
    const quantityDropdown = document.getElementById('quantity-dropdown');
    const alarmSoundModal = document.getElementById('alarm-sound-modal');
    
    if (!menuContainer.contains(event.target) && 
        !authModal.contains(event.target) && 
        !alarmSoundModal.contains(event.target)) {
        const dropdowns = ['news', 'program', 'catalog', 'intake', 'order', 'group', 'alarm'];
        dropdowns.forEach(dropdown => {
            const element = document.getElementById(dropdown + '-dropdown');
            if (element) {
                element.classList.remove('show');
            }
        });
        currentDropdown = null;
    }
    
    if (!event.target.closest('#quantity-button') && !quantityDropdown.contains(event.target)) {
        quantityDropdown.classList.remove('show');
    }
});

window.addEventListener('load', function() {
    updateAuthButton();
});

// ==================== 전역 함수 노출 ====================

// HTML에서 호출되는 함수들을 전역 스코프에 노출
window.goToMain = goToMain;
window.toggleDropdown = toggleDropdown;
window.showImage = showImage;
window.closePopup = closePopup;
window.showSlide = showSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.closeSlide = closeSlide;
window.checkMemberAuth = checkMemberAuth;
window.showAuthModal = showAuthModal;
window.verifyMemberAuth = verifyMemberAuth;
window.closeAuthModal = closeAuthModal;
window.handleAuthStatus = handleAuthStatus;
window.toggleQuantityDropdown = toggleQuantityDropdown;
window.selectQuantity = selectQuantity;
window.selectPriceType = selectPriceType;
window.registerOrder = registerOrder;
window.calculateAndCopy = calculateAndCopy;
window.resetOrderList = resetOrderList;
window.toggleAlarm = toggleAlarm;
window.showAlarmSoundModal = showAlarmSoundModal;
window.closeAlarmSoundModal = closeAlarmSoundModal;
window.previewAlarmSound = previewAlarmSound;
window.confirmAlarmSound = confirmAlarmSound;
window.addAlarmRow = addAlarmRow;
window.showHealthSurvey = showHealthSurvey;
window.closeHealthSurvey = closeHealthSurvey;
window.nextSurveyPage = nextSurveyPage;
window.prevSurveyPage = prevSurveyPage;
window.submitSurvey = submitSurvey;

// ==================== 디버그 및 유틸리티 함수 ====================

// 개발자 도구용 디버그 함수
window.debugInfo = function() {
    console.log('=== 독일피엠학교 디버그 정보 ===');
    console.log('현재 드롭다운:', currentDropdown);
    console.log('로그인 상태:', isLoggedIn);
    console.log('알람 활성화:', alarmEnabled);
    console.log('현재 슬라이드:', currentSlideIndex, '/', totalSlides);
    console.log('현재 설문 페이지:', currentSurveyPage, '/', totalSurveyPages);
    console.log('선택된 수량:', selectedQuantity);
    console.log('선택된 가격 타입:', selectedPriceType);
    console.log('선택된 알람음:', selectedAlarmSound);
    console.log('회원 데이터 캐시:', memberDataCache ? '로드됨' : '없음');
};

// 성능 모니터링
window.performanceCheck = function() {
    console.log('=== 성능 체크 ===');
    console.log('메모리 사용량:', performance.memory ? 
        `${Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)}MB` : '지원안됨');
    console.log('페이지 로드 시간:', `${Math.round(performance.now())}ms`);
};

// 에러 핸들링
window.addEventListener('error', function(event) {
    console.error('JavaScript 오류 발생:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});

// 언로드 시 정리
window.addEventListener('beforeunload', function() {
    if (alarmInterval) {
        clearInterval(alarmInterval);
    }
});

console.log('독일피엠학교 JavaScript 로드 완료 ✅');
