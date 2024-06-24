// 원을 생성하여 메인 랩에 추가하는 함수
function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    // 원의 크기를 랜덤으로 설정합니다.
    const size = Math.random() * 20 + 5; // 10px에서 60px 사이의 크기
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    // 원의 left 위치를 랜덤으로 지정합니다.
    const left = Math.random() * 100; // 0%에서 100% 사이의 위치
    circle.style.left = `${left}%`;

    // 원의 애니메이션 지연 시간을 랜덤으로 설정합니다.
    const delay = Math.random() * 5; // 0초에서 5초 사이의 지연 시간
    circle.style.animationDelay = `${delay}s`;

    document.querySelector('.mainWrap').appendChild(circle);

    // 원을 제거하는 함수
    setTimeout(() => {
        circle.remove();
    }, 5000); // 애니메이션이 끝난 후 원을 제거합니다.
}
// 일정 시간 간격으로 원을 생성합니다.
setInterval(createCircle, 400);
