$(document).ready(function() {
    // 비밀번호 표시 토글
    $('#passwordToggleImage').click(function() {
        const passwordInput = $('#passwordInput');
        const toggleImage = $('#toggleImage');

        // 비밀번호 입력 필드의 현재 타입 확인
        if (passwordInput.attr('type') === 'password') {
            // 비밀번호를 보여주기 위해 타입을 'text'로 변경
            passwordInput.attr('type', 'text');
            // 비밀번호가 보이는 상태를 나타내기 위해 이미지 변경
            toggleImage.attr('src', 'images/hidden.png');
        } else {
            // 비밀번호를 숨기기 위해 타입을 'password'로 변경
            passwordInput.attr('type', 'password');
            // 비밀번호가 숨겨진 상태를 나타내기 위해 이미지를 초기 상태로 변경
            toggleImage.attr('src', 'images/visual.png');
        }
    });

    // 포커스와 값의 존재에 따라 토글 이미지 표시/숨김 관리
    $('#passwordInput').on('focus blur input', function() {
        const $wrapper = $(this).closest('.textInputWrapper');

        // 입력 필드에 값이 있는지 확인
        if ($(this).val()) {
            // 값이 있으면 클래스 추가
            $wrapper.addClass('has-value');
        } else {
            // 값이 없으면 클래스 제거
            $wrapper.removeClass('has-value');
        }

        // 입력 필드가 포커스 상태인지 확인
        if ($(this).is(':focus')) {
            // 포커스 상태이면 클래스 추가
            $wrapper.addClass('focused');
        } else {
            // 포커스 상태가 아니면 클래스 제거
            $wrapper.removeClass('focused');
        }
    });

    // 자동 로그인 확인 및 로그인 시도
    if (localStorage.getItem('autoLogin') === 'true') {
        const savedId = localStorage.getItem('id');
        const savedPassword = localStorage.getItem('password');

        if (savedId && savedPassword) {
            login(savedId, savedPassword);
        }
    }

    // 로그인 버튼 클릭 이벤트
    $('#loginButton').click(function() {
        const id = $('#idInput').val();
        const password = $('#passwordInput').val();
        const autoLogin = $('#autoLoginCheckbox').is(':checked');

        if (autoLogin) {
            // 자동 로그인 정보 저장
            localStorage.setItem('autoLogin', 'true');
            localStorage.setItem('id', id);
            localStorage.setItem('password', password);
        } else {
            // 자동 로그인 정보 제거
            localStorage.removeItem('autoLogin');
            localStorage.removeItem('id');
            localStorage.removeItem('password');
        }

        login(id, password);
    });

    // 로그인 함수
    function login(id, password) {
        // formData 객체 생성
        const formData = {
            id: id,
            password: password
        };

        // AJAX 요청 보내기
        $.ajax({
            url: 'http://192.168.0.18:3001/docs/biz/login',
            type: 'POST',
            data: formData,
            success: function(response) {
                // 로그인 성공 시 처리 로직
                console.log('로그인 성공:', response);
                // 로그인 성공 시 페이지 리디렉션 및 로그인 버튼 변경
                $('#loginButtonHeader').text('로그아웃').attr('id', 'logoutButton');
                window.location.href = 'dashboard.html';
            },
            error: function(error) {
                // 에러 시 처리 로직
                console.log('로그인 실패:', error);
                alert('로그인에 실패하였습니다. 다시 시도해 주세요.');
            }
        });
    }

    // 로그아웃 버튼 클릭 이벤트
    $(document).on('click', '#logoutButton', function() {
        $.ajax({
            url: 'http://192.168.0.18:3001/docs/biz/logout',
            type: 'GET',
            success: function(response) {
                // 로그아웃 성공 시 처리 로직
                console.log('로그아웃 성공:', response);
                // 로그아웃 성공 시 로그인 버튼으로 변경 및 페이지 새로고침
                $('#logoutButton').text('로그인').attr('id', 'loginButtonHeader');
                localStorage.removeItem('autoLogin');
                localStorage.removeItem('id');
                localStorage.removeItem('password');
                window.location.href = 'index.html';
            },
            error: function(error) {
                // 에러 시 처리 로직
                console.log('로그아웃 실패:', error);
                alert('로그아웃에 실패하였습니다. 다시 시도해 주세요.');
            }
        });
    });

});
