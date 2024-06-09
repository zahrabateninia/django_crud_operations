$(document).ready(function() {
    var baseUrl = '/tasks/';

    // Form submission for creating tasks
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
            error: function(xhr, status, error) {
                alert('An error occurred. Please try again.');
            }
        });
    });

    // Delete task action
    $('#delete-form').submit(function(event) {
        event.preventDefault();
        var url = $(this).attr('action');
        var csrfToken = $('input[name=csrfmiddlewaretoken]').val();
        $.ajax({
            url: url,
            type: 'POST',
            data: {
                csrfmiddlewaretoken: csrfToken
            },
            success: function(response) {
                if (response.success) {
                    window.location.href = baseUrl;
                } else {
                    console.error('Server error:', response);
                    alert('An error occurred. Please try again.');
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    });
});
