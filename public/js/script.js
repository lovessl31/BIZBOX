// // 스크롤 헤더 이벤트
// document.addEventListener('DOMContentLoaded', function() {
//     const header = document.querySelector('.header');

//     //스크롤 이벤트를 감지하여 헤더의 스타일을 변경
//     function toogleHeaderBorder() {
//         if(window.scrollY > 0) {
//             header.classList.add('scrolled');
//         } else {
//             header.classList.remove('scrolled');
//         }
//     }

//     // 스크롤 이벤트에 함수 연결
//     window.addEventListener('scroll', toogleHeaderBorder);
// });


$(document).ready(function() {
    // 스크롤 헤더 이벤트
    const $header = $('.header');

    function toogleHeaderBorder() {
        if($(window).scrollTop() > 0) {
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
    }

    $(window).on('scroll', toogleHeaderBorder);

        // 비밀번호 표시 토글
        $('#passwordToggleImage').click(function() {
            const passwordInput = $('#passwordInput');
            const toggleImage = $('#toggleImage');
    
            // 비밀번호 입력 필드의 현재 타입 확인
            if (passwordInput.attr('type') === 'password') {
                passwordInput.attr('type', 'text');
                toggleImage.attr('src', 'images/hidden.png');
            } else {
                passwordInput.attr('type', 'password');
                toggleImage.attr('src', 'images/visual.png');
            }
        });
        
        // 포커스와 값의 존재에 따라 토글 이미지 표시/숨김 관리
        $('#passwordInput').on('focus blur input', function() {
            const $wrapper = $(this).closest('.textInputWrapper');
    
            if ($(this).val()) {
                $wrapper.addClass('has-value');
            } else {
                $wrapper.removeClass('has-value');
            }
    
            if ($(this).is(':focus')) {
                $wrapper.addClass('focused');
            } else {
                $wrapper.removeClass('focused');
            }
        });

    // 서비스 신청 링크 클릭 이벤트
    $('.nav a[href="service.html"]').click(function(event) {
        if (!sessionStorage.getItem('user_id')) {
            // 로그인되어 있지 않으면 회원가입 페이지로 리디렉션
            event.preventDefault();
            alert('로그인 후 이용하실 수 있습니다.');
            window.location.href = 'login.html';
        }
    });
    
    // 페이지 로드 시 세션 스토리지 확인
    if (sessionStorage.getItem('user_id')) {
        setNavToLoggedIn();
    } else {
            setNavToLoggedOut();
    }

    function setNavToLoggedIn() {
        $('#nav-login').hide();
        $('#nav-logout').show();
        $('#nav-signup').hide(); // 회원가입 버튼 숨기기
    }

    function setNavToLoggedOut() {
        $('#nav-login').show();
        $('#nav-logout').hide();
        $('#nav-signup').show(); // 회원가입 버튼 보이기
    }
    
    // 로그인 버튼 클릭 이벤트
    $('#loginButton').click(function() {
        const id = $('#idInput').val();
        const password = $('#passwordInput').val();
        const formData = {
            id: id,
            password: password
        };
        $.ajax({
            url: 'http://192.168.0.18:3001/biz/login',
            type: 'POST',
            data: formData,
            xhrFields: {
                withCredentials: true
            },
            success: function(response, textStatus, xhr) {
                // 로그인 상태로 네비게이션 변경
                alert('로그인 성공');
                // 응답 데이터를 콘솔에 출력하여 확인
                console.log('응답 데이터:', response);
                
                // 응답 데이터에서 user_id 추출
                let user_id = response.data.user_id;
                console.log('user_id : ', user_id);
                
                // user_id 값을 세션 스토리지에 저장
                sessionStorage.setItem('user_id', user_id);
                setNavToLoggedIn();
                
                //성공적으로 로그인되면 메인 페이지로 리디렉션
                window.location.href = 'index.html';
            },
            error: function(xhr, status, error) {
                // 로그인 실패 시, 에러 처리
                alert('로그인 실패: ' + error);
            }
        });
    });
    
    function setNavToLoggedIn() {
        // 로그인 상태에 따른 UI 변경
        $('#nav-login').hide();
        $('#nav-logout').show();
        $('#nav-signup').hide(); // 회원가입 버튼 숨기기
    }
        
    function setNavToLoggedOut() {
        $('#nav-login').show();
        $('#nav-logout').hide();
    }

    // 로그아웃 버튼 클릭 이벤트
    $('#nav-logout').click(function() {
        // 세션 스토리지에서 user_id 삭제
        sessionStorage.removeItem('user_id');
        window.location.href = 'login.html';  // 로그인 페이지로 리디렉션
    });
});


