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


  $(".add-to-library").on("click", function(e) {

    $target = $(e.target)
    const title = $target.attr("data-title")
    const desc = $target.attr("data-desc")
    const author = $target.attr("data-author")
    let user;
    let image;
    if ($target.attr("data-cover")) {
      image = $target.attr("data-cover")
    }
 // = $target.attr("user-data")
    if (!user) {
      $.ajax({
        type: "POST",
        url: "/books",
        data: {
          title: title,
          summary: desc,
          author: author,
          image: (image ? image : null)
        },
        success: function(res) {
          window.location.href = "/books"
        },
        error: function(err) {
          console.log(err);
        }
      })
    }
  })

})
