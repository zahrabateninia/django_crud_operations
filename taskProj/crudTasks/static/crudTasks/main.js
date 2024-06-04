$(document).ready(function() {
    // form submission 
    $('#task-form').submit(function(event) {
        event.preventDefault();  
        var url = $(this).attr('action');  
        var method = $(this).attr('method');  
        var formData = $(this).serialize();  

        $.ajax({
            type: method,
            url: url,
            data: formData,
            success: function(response) {
                // Assuming the server returns the updated task list HTML
                $('#task-list').html(response);  // Update the task list
                $('#task-form')[0].reset();  
                alert('Task saved successfully!');
            },
            error: function(response) {
                alert('An error occurred. Please try again.');
            }
        });
    });

    // delete action 
    $(document).on('click', '.delete-task', function(event) {
        event.preventDefault();  // Prevent the link from navigating
        var url = $(this).attr('href');  

        if (confirm('Are you sure you want to delete this task?')) {
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()  
                },
                success: function(response) {
                    // Assuming the server returns the updated task list HTML
                    $('#task-list').html(response);  
                    alert('Task deleted successfully!');
                },
                error: function(response) {
                    alert('An error occurred. Please try again.');
                }
            });
        }
    });
});
