<?php
header('Content-Type: application/json');

//Classes
// Person Class
class Person
{
    var $Name;
    var $Age;
    var $Active;
    var $Address;
    var $FavoriteDeserts;
    var $Generator;
}

// Address Class
class Address
{
    var $Street;
    var $City;
    var $State;
}

//#end Classes



// Create an Address Object and populate.
$myAddress = new Address();
//$myAddress->Street = "123 State St";
$myAddress->City = "Santa Barbara";
$myAddress->State = "CA";


// Create an Person object and populate.
$myPerson = new Person();
$myPerson->Name = "Leroy";
$myPerson->Age = 25;
$myPerson->Active = true;
$myPerson->Address = $myAddress;
$myPerson->FavoriteDeserts = array("Mint Ice Cream", "Cheesecake", "Lemon Cake", "Shortbread Cookies");



$myPerson->Generator = "PHP " . phpversion();

// JSON it!
echo json_encode($myPerson);

