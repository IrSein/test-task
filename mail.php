<?php
   
   if(!empty($_POST['name']) and !empty($_POST['phone']) and !empty($_POST['email']) and !empty($_POST['select']) ){
      
      $name = trim(strip_tags($_POST['name']));
      $phone = trim(strip_tags($_POST['phone']));
      $email = trim(strip_tags($_POST['email']));
      $select = trim(strip_tags($_POST['select']));
      $comment = strip_tags($_POST['comment']);
   }

   $arr =[
      "name" => $name,
      "phone" => $phone,
      "email" => $email,
      "select" => $select,
      "comment" => $comment,
   ];
   
   echo json_encode($arr);

   