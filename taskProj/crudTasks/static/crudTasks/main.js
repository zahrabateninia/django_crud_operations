$(document).ready(function() {
    var baseUrl = '/tasks/';

    // Form submission
    $('#task-form').submit(function(event) {
        event.preventDefault();
        var url = baseUrl + 'create/';
        var method = $(this).attr('method');
        var formData = $(this).serialize();

        $.ajax({
            type: method,
            url: url,
            data: formData,
            success: function(response) {
                if (response.success) {
                    var redirectUrl = baseUrl;
                    window.location.href = redirectUrl;
                } else {
                    alert('Error: ' + JSON.stringify(response.errors));
                }
            },
            error: function(response) {
                alert('An error occurred. Please try again.');
            }
        });
    });

    // Delete action
    $(document).on('click', '.delete-task', function(event) {
        event.preventDefault();
        var url = $(this).attr('href');

        if (confirm('Are you sure you want to delete this task?')) {
            var csrfToken = $('input[name=csrfmiddlewaretoken]').val();  // Ensure CSRF token is retrieved correctly
            console.log('CSRF Token:', csrfToken);
            console.log('URL:', url);
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    csrfmiddlewaretoken: csrfToken
                },
                success: function(response) {
                    if (response.success) {
                        window.location.href = baseUrl;
                    } else {
                        console.log('An error occurred. Please try again.');
                    }
                },
                error: function(response) {
                    console.log('An error occurred. Please try again.');
                }
            });
        }
    });
});
