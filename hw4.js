var passXmlFile = function(){

	if (document.implementation && 
	document.implementation.createDocument) 
	{ 
		var xmlDoc = document.implementation.createDocument("","doc",null);   
		xmlDoc.async = false;   
		
		fileName = document.getElementById("xmlNameInput").value;
		
		loaded = xmlDoc.load(fileName); 
		if(!loaded){ 
		alert("Cannot find " + fileName); 
		} 
		else 
		{ 
			alert(fileName + " open succeed");
			str = generatePage(printTable(xmlDoc));
			//document.getElementById("content").innerHTML = str;
			customerWindow = window.open('example.html','');
			customerWindow.document.write(str);
			
			//customerWindow.document.getElementById("content").innerHTML = "hello";
			
			customerWindow.document.close();
			
		} 
	} 

}

function generatePage(str)
{
	return "<HTML> <HEAD> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">"
+ "<TITLE>Simple Javascript</TITLE><script type="text/javascript"></script>"
+ "<style media="screen" type="text/css">table, th, td{border: 1px solid black;}</style></HEAD> "
+ "<BO""DY>" + str + "</BODY></HTML>";
}



function printOneOrder(order)
{
		str = '';
		y=order.childNodes;				
		for (j=0;j<y.length;j++)
		{
		   if (y[j].nodeType == 1 && y[j].nodeName != 'CustomerID' && y[j].nodeName != 'EmployeeID')
		   { 
			  if( y[j].nodeName == 'ShipInfo')
			  {
				str = str + createBlock(y[j].getAttribute("ShippedDate"));
				shipInfochild = first_child(y[j]);
				while(shipInfochild)
				{				
					str = str + createBlock(data_of(first_child(shipInfochild)));
					shipInfochild = node_after(shipInfochild);
				}
			  }
			  else
				str = str + createBlock(y[j].childNodes[0].nodeValue);
			  
			  
		   }
		}
		
		document.write(createRow(str));
}

function showRelatedOrdersByCustomerID(customerID)
{
	order = xmlDoc.getElementsByTagName("Order")[0];
	document.write('<table> <th> Order for Customer ' + customerID + '</th>');
	document.write(createRow(createBlock("Order Date") +  createBlock("Required Date") + createBlock("ShipInfo") + createBlock("Ship Via") + createBlock("Freight") + createBlock("ShipName")+ createBlock("Ship Address")+ createBlock("Ship City")+ createBlock("Ship Region")+ createBlock("Ship Postal Chode")+ createBlock("Ship Country")));
	
	
	while(order)
	{
		//find whether the order's customer id is customerID	
		orderchild = first_child(order);
		while(orderchild)
		{
			if(orderchild.nodeName == 'CustomerID')
			{	
				if(data_of(first_child(orderchild)) == customerID)
					printOneOrder(order);
				else
					break;
			}			
			orderchild = node_after(orderchild);
		}
		order = node_after(order);
	}
	
	document.write('<table>');
}



function showCustomerOrder()
{
	var inputObjects = document.getElementsByTagName("input");
	for(var i = 0; i < inputObjects.length; i++)
	{
		var obj = inputObjects[i];
		if( obj.type == 'radio' && obj.checked == true)
		{
			customerID = obj.id;
			showRelatedOrdersByCustomerID(customerID);
		}
	}
}


function createRow(foo)
{
	
	return '<tr>' + foo + '</tr>';


}

function createBlock(str)
{
	return '<td>' + str + '</td>';
}

function createTable(content)
{
	document.write('<table>' + content + '</table>');
}

var printTable = function(xmlDoc)
{	
	content = '';
	content += '<form> <table> <th> List of Customer Information </th>';
	
	content += (createRow(createBlock("Select One Click Submit") +  createBlock("Customer ID") + createBlock("Company Name") + createBlock("Contact Name") + createBlock("Contact Title") + createBlock("Phone")));
	
	
	customer = xmlDoc.getElementsByTagName("Customer")[0];
	
	var customerArray = new Array();
	
	i = 0;
	while (customer)
	{
	
		radioTextLeft = '<INPUT TYPE="radio" name = "order" id ="';		
		radioTextRight = '">';		
		str = createBlock(radioTextLeft + customer.getAttribute("CustomerID") + radioTextRight);
		
		str = str + createBlock(customer.getAttribute("CustomerID"));
		customerArray[i] = customer.getAttribute("CustomerID");
		
		customerChild = first_child(customer);
		while(customerChild)
		{
			if(customerChild.nodeType == 1 && customerChild.nodeName != 'Fax')
			{
				node = customerChild.childNodes[0];
				if(!is_all_ws(node))
				str = str + createBlock(data_of(node));
			}
			customerChild = node_after(customerChild);
		}
		
		str = createRow(str);
		content +=(str);
		i++;
	  
	  
	  
	  customer = node_after(customer);
	 
	}
	
	content += '</table></form><input type="submit" value="Submit" onClick = "showCustomerOrder()"/>';
	return content;
}


function openNewWindow()
{
	
}

	/*
var xmlDoc = document.implementation.createDocument("","doc",null);   
		xmlDoc.async = false;   
		loaded = xmlDoc.load("order.xml"); 
	printTable();
	showRelatedOrdersByCustomerID('GREAL');
	*/