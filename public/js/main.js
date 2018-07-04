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

  $(".user-remove-book").on("click", function(e) {
    $target = $(e.target);
    const id = $target.attr("data-id");
    const userID = ($target.attr("user-data"));

    $.ajax({
      type: "DELETE",
      url: "/users/" + userID + "/books/" + id,
      success: function(res) {
        window.location.href = `/users/${userID}`
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
    let userID = ($target.attr("user-data"));
    let image;
    if ($target.attr("data-cover")) {
      image = $target.attr("data-cover")
    }

    if (userID) {
      $.ajax({
        type: "POST",
        url: `/users/${userID}/books`,
        data: {
          title: title,
          summary: desc,
          author: author,
          image: (image ? image : null)
        },
        success: function(res) {
          console.log(res)
          window.location.href = `/users/${userID}/`
        },
        error: function(err) {
          console.log(err);
        }
      })
      // console.log("SOMEONE HERE", userID)
    }

    else {
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
      // console.log("NOBODY HERE")
    }
  })
})


$(document).on("submit", ".add-book-form", function(e) {
  e.preventDefault();
  alert("HEY")

  $target = $(e.target);
  const title = $target.attr("#title")
  const author = $target.attr("#author")
  const summary = $target.attr("#summary")

  if (!title || title === undefined) {
    alert("Need a title")
  }

  $.ajax({
    type: "POST",
    url: "/books",
    data: {
      title: title,
      author: author,
      summary: summary
    },
    success: function(res) {
      window.location.href = "/books"
    },
    error: function(err) {
      console.log(err)
    }
  })
})
