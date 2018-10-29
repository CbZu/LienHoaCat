$("document").ready(function() {
    // $('input[type=file]').on("change", function() {
    //     // var $files = $(this).get(0).files;
    //     // var returnURL = '';
    //     // if ($files.length) {
    //     //     console.log('uploading imgur');
    //     //
    //     //     var apiURL = 'https://api.imgur.com/3/image';
    //     //     var apiKey = 'Client-ID 8cbfbb88f13ed41';
    //     //
    //     //     var settings = {
    //     //         async: true,
    //     //         crossDomain: true,
    //     //         processData: false,
    //     //         contentType: false,
    //     //         type: 'POST',
    //     //         url: apiURL,
    //     //         headers: {
    //     //             Authorization: apiKey,
    //     //             Accept: 'application/json'
    //     //         },
    //     //         mimeType: 'multipart/form-data'
    //     //     };
    //     //
    //     //     var formData = new FormData();
    //     //     formData.append('image', $files[0]);
    //     //     settings.data = formData;
    //     //
    //     //     $.ajax(settings)
    //     //         .done(function(response) {
    //     //             console.log(response);
    //     //             console.log($.parseJSON(response).data.link);
    //     //             returnURL = $.parseJSON(response).data.link;
    //     //         })
    //     //         .fail(function(){
    //     //             console.log('Upload Fail')
    //     //         });
    //     // }
    //
    //
    // });

    $('.uploadImg1').on('click', function(){
        var x = uploadImage('123123');
        if(x.trim().length>0) saveImageToDb(x);
    });

    saveImageToDb = (urlImage)=>{
        $.ajax({
            type: 'POST',
            url: '/users/uploadImage',
            contentType: 'application/json',
            data: JSON.stringify({
                imageUrl: urlImage
            }),
            success: function(res){
                console.log('save DB success');
                console.log(res);
            }
        });
    }

    function uploadImage(chooseImage){
        //TODO: choose file later.
        var files = $('.image1').get(0).files;
        var returnURL = '';
        if (files.length) {
            console.log('uploading imgur');

            var apiURL = 'https://api.imgur.com/3/image';
            var apiKey = 'Client-ID 8cbfbb88f13ed41';

            var settings = {
                async: false,
                crossDomain: true,
                processData: false,
                contentType: false,
                type: 'POST',
                url: apiURL,
                headers: {
                    Authorization: apiKey,
                    Accept: 'application/json'
                },
                mimeType: 'multipart/form-data'
            };

            var formData = new FormData();
            formData.append('image', files[0]);
            settings.data = formData;
            console.log('gogogo');
            $.ajax(settings)
                .done(function(response) {
                    console.log($.parseJSON(response));
                    returnURL = $.parseJSON(response).data.link;

                })
                .fail(function(){
                    console.log('Upload Fail');
                    returnURL =  'upload fail';
                })
        }
        return returnURL;
    };
});