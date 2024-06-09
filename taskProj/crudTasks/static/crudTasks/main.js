$(document).ready(function() {
    var baseUrl = '/tasks/'; // actual base URL
    
    // Form submission
    $('#task-form').submit(function(event) {
        event.preventDefault();
        var url = baseUrl + 'create/';  // Construct the URL correctly
        var method = $(this).attr('method');
        var formData = $(this).serialize();

        $.ajax({
            type: method,
            url: url,
            data: formData,
            success: function(response) {
                if (response.success) {
                    var redirectUrl = baseUrl;  // Ensure correct base URL
                    window.location.href = redirectUrl;  // Redirect to the task list page
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
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    // csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                    csrfmiddlewaretoken: '{{ csrf_token }}'
                },
                success: function(response) {
                    $('#task-list').html(response);
                    // alert('Task deleted successfully!');
                    console.log(response)
                },
                error: function(response) {
                    // alert('An error occurred. Please try again.');
                    console.log(response)
                }
            });
        }
    });

    
});


