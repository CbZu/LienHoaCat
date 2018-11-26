module.exports=function(app,controllers){
   	 	app.post('/PetMart/signup',controllers.account.signup);
    	app.post('/PetMart/login',controllers.account.login);
        app.post('/PetMart/get-user',controllers.account.get_user);
    	app.post('/PetMart/add-product',controllers.todo.add_product);
    	app.post('/PetMart/add-category',controllers.todo.add_category);
         app.post('/PetMart/remove',controllers.todo.remove);
    	app.post('/PetMart/get-product',controllers.todo.get_product);
        app.post('/PetMart/get-product-by-name',controllers.todo.get_product_by_name);
    	app.post('/PetMart/get-category',controllers.todo.get_category);
    	app.post('/PetMart/add-to-cart',controllers.todo.add_to_cart);
    	app.post('/PetMart/get-cart',controllers.todo.get_cart);
    	app.post('/PetMart/get-payment-detail',controllers.todo.get_payment_detail);
    	app.post('/PetMart/add-to-payment',controllers.todo.add_to_payment);
    	app.post('/PetMart/update-payment',controllers.todo.update_payment);
        app.post('/PetMart/get-size-product',controllers.todo.get_size_product);
    	app.post('/PetMart/get-order',controllers.todo.get_order);
    	app.post('/PetMart/delete-payment',controllers.todo.delete_payment);
        app.post('/PetMart/add-promotion',controllers.todo.add_promotion);
    	app.post('/PetMart/update-cart',controllers.todo.update_cart);
        app.post('/PetMart/delete-cart',controllers.todo.delete_cart);
        app.post('/PetMart/get-noti',controllers.todo.get_noti);
    app.post('/PetMart/update-noti',controllers.todo.update_noti_API);
    app.post('/PetMart/get-promote',controllers.todo.get_promote);
    app.post('/PetMart/update-promote',controllers.todo.update_promote_API);
    app.post('/PetMart/add-to-wishlist',controllers.todo.add_to_wishlist);
    app.post('/PetMart/get-wishlist',controllers.todo.get_wishlist);
    app.post('/PetMart/update-wishlist',controllers.todo.update_wishlist);
    app.post('/PetMart/get-voucher',controllers.todo.get_voucher);

        app.get('/',controllers.index.home);
        app.post('/ajax/checkEmail',controllers.ajax.checkEmail);
    app.post('/ajax/checkProduct',controllers.ajax.checkProduct);
    app.get('/logout',controllers.account.logout);
    app.post('/login',controllers.account.login_admin);
        app.get('/payment-detail',controllers.todo.payment_detail);
        app.post('/ajax/updateSizeId',controllers.ajax.updateSizeId);
        app.post('/ajax/deleteSizeId',controllers.ajax.deleteSizeId);
        app.get('/register',controllers.account.register);
        app.post('/ajax/checkUser',controllers.ajax.checkUser);
        app.post('/signup',controllers.account.signup_admin);
        app.get('/maintenance',controllers.account.show_account);
        app.get('/maintenance-prd/:catflt',controllers.todo.maintenance_prd);
        app.get('/create-prd',controllers.todo.create_prd);
        app.get('/edit-account',controllers.account.edit_account);
    app.get('/maintenance-cat',controllers.todo.maintenance_cat);
    app.post('/ajax/getEmail',controllers.ajax.getEmail);
        app.post('/ajax/getCat',controllers.ajax.getCat);
        app.post('/ajax/getPrd',controllers.ajax.getPrd);
        app.get('/product-detail/:catflt/:prdname',controllers.todo.product_detail);
        app.post('/ajax/updateProduct',controllers.ajax.updateProduct);
        app.post('/ajax/updateProductOk',controllers.ajax.updateProductOk);
        app.post('/ajax/addProduct',controllers.ajax.addProduct);
    app.post('/ajax/addProductImages',controllers.ajax.addProductImages);
    app.post('/ajax/add-to-cart-admin',controllers.ajax.addSizeToCart);

        app.post('/ajax/updateProductImage',controllers.ajax.updateProductImage);
        app.get('/noti-maintenance',controllers.todo.show_noti);
    app.get('/noti-register',controllers.todo.noti_register);
    app.post('/add-noti',controllers.todo.add_noti);
    app.get('/edit-noti',controllers.todo.edit_noti);
    app.post('/update-noti',controllers.todo.update_noti);

    app.get('/promote-maintenance',controllers.todo.show_promote);
    app.get('/promote-register',controllers.todo.promote_register);
    app.post('/add-promote',controllers.todo.add_promote);
    app.get('/edit-promote',controllers.todo.edit_promote);
    app.post('/update-promote',controllers.todo.update_promote);
    app.get('/show-payment', controllers.todo.show_payment);
    app.get('/checkout', controllers.todo.checkout);
    app.post('/app-work', controllers.todo.app_phongthuy);
    app.get('/app-phongthuy', controllers.todo.app_phongthuy);

    /*app.get('/register',controllers.account.register);


    app.get('/maintenance',controllers.account.show_account);
    app.get('/edit-account',controllers.account.edit_account);
    app.post('/save-account',controllers.account.save_account);

    app.post('/ajax/checkEmail',controllers.ajax.checkEmail);
    app.post('/ajax/checkUser',controllers.ajax.checkUser);
    app.post('/ajax/getEmail',controllers.ajax.getEmail);
    app.post('/ajax/checkEmailAddProject',controllers.ajax.checkEmailAddProject);
    app.post('/ajax/checkProjectCode',controllers.ajax.checkProjectCode);
    app.post('/ajax/getName',controllers.ajax.getName);
    app.post('/ajax/getProject',controllers.ajax.getProject);
    app.post('/ajax/getTask',controllers.ajax.getTask);
    app.post('/ajax/count',controllers.ajax.count);
    app.post('/login',controllers.account.login);
    app.get('/logout',controllers.account.logout);
    app.get('/add-project',controllers.todo.add_project);
    app.post('/save-project',controllers.todo.save_project);
    app.get('/edit-project',controllers.todo.edit_project);
    app.get('/delete-project/:id',controllers.todo.delete_project);
       app.get('/add-task',controllers.todo.add_task);
    app.post('/save-task',controllers.todo.save_task);
    app.get('/edit-task',controllers.todo.edit_task);
    app.get('/delete-task/:id&:project',controllers.todo.delete_task);
    app.get('/export-excel/project',controllers.other.export_excel);
    app.get('/export-excel/user',controllers.other.export_excel_user);
    app.get('/export-excel/count',controllers.other.export_excel_count);
    app.get('/export-excel/paid',controllers.other.paid);
    app.get('/export-excel/project-payment',controllers.other.project_payment);
    app.get('/show-task',controllers.todo.show_task);
    app.get('/reset-password',controllers.account.reset_password);
    app.post('/update-password',controllers.account.update_password);
    app.post('/ajax/checkPass',controllers.ajax.check_pass);*/
}
