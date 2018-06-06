$(document).ready(function() {
  $(".delete-book").on("click", function(e) {
    $target = $(e.target);
    const id = $target.attr("data-id");

    $.ajax({
      type: "DELETE",
      url: "/books/" + id,
      success: function(res) {
        // console.log(window.location.href)
        window.location.reload()
      },
      error: function(err) {
        console.log(err);
      }
    })
  });
})
