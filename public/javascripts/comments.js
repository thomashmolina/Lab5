$(document).ready(function() {
    $("#postComment").click(function() {
        var myobj = { Name: $("#name").val(), Comment: $("#comment").val() };
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });
    $("#getComments").click(function() {
        $.getJSON('comment', function(data) {
            console.log(data);
            var everything = "<ul>";
            for (var comment in data) {
                com = data[comment];
                everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
            }
            everything += "</ul>";
            $("#comments").html(everything);
        })
    })
    $("#deleteComments").click(function() {
        var url = "comment";
        $.ajax({
            url: url,
            type: "DELETE",
            data: '',
            success: function(data, textStatus) {
                console.log(textStatus);
            }
        });
    })
    $("#searchComments").click(function() {
        var name = $("#name").val();
        var url = "comment?q=" + name;
        console.log(url);
        $.getJSON(url, function(data) {
            console.log(data);
            var search = $("#name").val();
            var everything = "<ul>";
            for (search in data) {
                com = data[search];
                everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
            }
            everything += "</ul>";
            $("#comments").html(everything);
        })
    })

});
