$(document).on('submit', '#addToWatchlist', function(e){
    e.preventDefault();

    if ($('#button-auction').hasClass('added')){
        $.ajax({
            type:'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success:function(){
                watchlist = $('#watchListTotal')
                actualValue = watchlist.html()
                watchlist.text(parseInt(actualValue) - 1)
                $('#heart').css("color", "white")
                $('#button-auction').removeClass('added')
            }
        })
    } else{
        $.ajax({
            type:'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success:function(){
                watchlist = $('#watchListTotal')
                actualValue = watchlist.html()
                watchlist.text(parseInt(actualValue) + 1)
                $('#heart').css("color", "red")
                $('#button-auction').addClass('added')
            }
        })
    }
});

$(document).on('submit', '#addBid', function(e){
    e.preventDefault();
    auction = $(this).data("auction")
    newBid = $('#newBid').val()
    lastBid = $(`.lastBid${auction}`).val()

    if(newBid > 0 && newBid > lastBid){
        $.ajax({
            type:'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function() {
                $(`.lastBid${auction}`).val(newBid)
                $(`.lastBid${auction}`).html(`Current Bid: ${newBid}`)
                totalValue = $('#smallTotalBid').html()
                $('#smallTotalBid').html(parseInt(totalValue) + 1)
                $('#yourLastBid').html('Your bid is the current bid.')
                $('#newBid').val('')
            }
        });
    }
})

$(document).on('submit', '#addComment', function(e){
    e.preventDefault();
    commentsList = $('#commentsList')
    commentToAdd = $('#commentToAdd').val()
    comentsListHtml = commentsList.html()
    
    $.ajax({
        type:'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: function() {
            console.log('created comment')
            commentsList.html(
                comentsListHtml +                 
                    `<div class="comment">
                        <small><strong>{{comment.user|title}}</strong></small>
                        <p>{{comment.comment}}</p>
                        <div class="btn-right">
                            <small>{{comment.date}}</small>
                        </div>
                    </div>`
            )

            /// ARREGLAR ///
            $('#commentToAdd').val('')
        }
    });
})

$(document).on('submit', '#deleteFromWatchlist', function(e){
    e.preventDefault();
    auctionId = $(this).data('auction')
    auction = $(`#auction${auctionId}`)
    watchlist = $('#watchListTotal')

    $.ajax({
        type:'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: function() {
            console.log('deleted')
            auction.remove()
            watchlist = $('#watchListTotal')
            actualValue = watchlist.html()
            watchlist.text(parseInt(actualValue) - 1)
        }
    })
})
