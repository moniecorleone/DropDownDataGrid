# DropDownDataGrid

This jquery plugin combines the functionality of datagrid and combo box into one. 

[Demo]


## Basic Usage

### HTML
```html
    <div id="drddowndatagrid">
    </div> 
```
### jQuery
```js
 var date = new Date();
    var listitem = [
       { ID: 1, SampleID: 51, SampleCreated: date },
       { ID: 2, SampleID: 52, SampleCreated: date },
       { ID: 3, SampleID: 53, SampleCreated: date }
    ];

    $(function () {
        var listitems;
        $("#drddowndatagrid").DropdownDatagrid({
            defaultselecttext: "Select",
            //defaultvalue: { field: "ID", value: 2 },
            gridwidth: '500px',
            data: listitem,
            ValueMemberId: 'ID',
            displayColumn: 'SampleID',
            columns: [
              { field: 'ID', title: 'ID', align: 'center' },
              { field: 'SampleCreated', title: 'Created', align: 'left' }
            ],
            onRowSelection: function (rowid, ele, selected) {
                alert("rowid : " + rowid + " selected : " + selected)
            },
        });
        $("#drddowndatagrid").DropdownDatagrid('defaultvalue', { field: "SampleID", value: 53 });
        $("#drddowndatagrid").DropdownDatagrid('reload');

    });
```
### Copyright

MIT-LICENCE
