$(document).ready(function() {
  $(".delete-book").on("click", function(e) {
    $target = $(e.target);
    const id = $target.attr("data-id");

    $.ajax({
      type: "DELETE",
      url: "/books/" + id,
      success: function(res) {
        window.location.href = "/books"
      },
      error: function(err) {
        console.log(err);
      }
    })
  });
})
