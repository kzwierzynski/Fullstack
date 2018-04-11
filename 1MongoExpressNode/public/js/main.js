$(document).ready(()=>{
    $(".del-art").on("click", (event)=>{
        // let id = $(".del-art").data("id");
        let id = $(event.target).attr("data-id");
        let confirmation = confirm("Are you sure you want to delete this article?")
        if(confirmation){
            $.ajax({
                type: "DELETE",
                url: "/articles/"+id,
                success: (repsonse)=>{
                    alert("Article Deleted");
                    window.location.href ='/';
                },
                error: (err)=>{
                    console.log(err);
                }
            });
        } else {
            return false;
        }
        
    });
    
    
});