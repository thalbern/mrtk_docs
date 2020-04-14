function createDropdown()
{
	// configurable values:
	var defaultTitle = "release/0.8.0"; // title in the dropdown for the root version of the docs
	var versionArray = ["release/0.8.0", "release/0.9.0"]; // list of all versions in the version folder
	
	//--------------------------------------
	
	// get web root path
	var script = document.getElementById('dropdownScript');
	var scriptPath = script.src;
	var currentVersionName = defaultTitle;
	var isDefaultInVersionFolder = false;
	var rootDir = scriptPath.substring(0, scriptPath.lastIndexOf('web/'));
	
	// figure out in which version we're currently working in
	for (var i = 0; i < versionArray.length; i++)
	{
		var currentUrl = window.location.href.toString();
		if (currentUrl.indexOf(versionArray[i]) > 0)
		{
			currentVersionName = versionArray[i];
			
			// remember if our current version is also the default 
			if (currentVersionName.localeCompare(defaultTitle) == 0)
			{
				isDefaultInVersionFolder = true;
			}
			
			break;
		}
	}
		
	// create dropdown button
	var versionDropDiv = document.getElementById('versionDropdown');
	var btn = document.createElement('button');
	btn.className = "dropbtn";
	var buttonName = "Version - " + currentVersionName;
	var btnText = document.createTextNode(buttonName);
	btn.appendChild(btnText);
	var innerDiv = document.createElement('div');
	innerDiv.className = "version-dropdown-content";
	versionDropDiv.appendChild(btn);
	versionDropDiv.appendChild(innerDiv);

	// create default entry
	if (currentVersionName != defaultTitle && isDefaultInVersionFolder == false)
	{
		createEntry(innerDiv, defaultTitle, rootDir+"README.html");
	}
	
	// create version entries
	for (i = 0; i<versionArray.length; i++)
	{
		if (versionArray[i] != currentVersionName && versionArray[i] != defaultTitle)
		{
			createEntry(innerDiv, versionArray[i], rootDir+"version/"+versionArray[i]+"/README.html");
		}
	}
}

function createEntry(attachTo, name, url)
{
	var a = document.createElement('a');
	var linkText = document.createTextNode(name);
	a.appendChild(linkText);
	a.href = url;
	a.title = name;
	attachTo.appendChild(a);
}

createDropdown();