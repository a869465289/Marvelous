$(function(){
		 
	// 加载数据的方法
	function loadData(){
		let collection = localStorage.getItem('todo');
		if(collection){
			return JSON.parse(collection);
		}else{
			return [];
		}
	}
	
	// 保存数据的方法
	function saveData(data){
		localStorage.setItem('todo111111111111111111', JSON.stringify(data));
	}
	
	 // 加载网页数据
	load();
	function load() {
	 	let todoCount = 0; // 完成的任务
		let doneCount = 0; // 未完成的任务
		let doneStr = ''; // 已完成的任务内容
		let todoStr = ''; // 正在完成的任务内容
		let todolist = loadData();
		if (todolist && todolist.length > 0){
			// 有数据
			todolist.forEach(function(data, i){
				if(data.done){
					doneStr +=`
						<li>
							<input type="Checkbox" index=${i} checked="checked">
							<p id='p-${i}' index=${i}>${data.title}</p>
							<a href="javascript:;">-</a>
						</li>
					`;
					doneCount ++;
				}else{
					todoStr +=`
						<li>
							<input type="Checkbox" index=${i} ">
							<p id='p-${i}' index=${i}>${data.title}</p>
							<a href="javascript:;">-</a>
						</li>
					`;
					todoCount ++;
				}
				$('#donelist').html(doneStr);
				$('#todolist').html(todoStr);
				$('#donecount').html(doneCount);
				$('#todocount').html(todoCount);
			})
		}else{
			// 无数据
			$('#todolist').html('');
			$('#donelist').html('');
			$('#todocount').html(todoCount);
			$('#donecount').html(doneCount)
		}
	 }
	
	// 添加数据的方法
	$('#title').keydown(function(event){
		if(event.keyCode === 13){ // 空格键是13
			let val = $(this).val(); // 获取输入的文本
			
			if(!val){
				alert('输入不能为空！');
			}else{
				let data = loadData();
				data.unshift({ //在最前面追加内容，就可以在最前面显示
					title: val,
					done: false,
				})
				$(this).val(''); //清空内容
				saveData(data);
				load(); // 重新加载数据
			}
		}
	})

	// 事件代理 删除操作
	$('#todolist').on('click', 'a', function(){ // 选择器要准确
		let i = $(this).parent().index();
		let data = loadData();
		data.splice(i, 1);  // 删除选中的数据
		saveData(data);
		load();
	})
	
	$('#donelist').on('click', 'a', function(){ // 选择器要准确
		let i = $(this).parent().index();
		let data = loadData();
		data.splice(i, 1);  // 删除选中的数据
		saveData(data);
		load();
	})

	$('#todolist').on('change', 'input[type=Checkbox]',function(){
		let i = parseInt($(this).attr('index')); // 取到标签中的index索引
		update(i, 'done', true); // 进行状态转换
	})
	
	$('#donelist').on('change', 'input[type=Checkbox]',function(){
		let i = parseInt($(this).attr('index'));
		update(i, 'done', false);
	})

	function update(i, key, value){
		let data = loadData(); 
		let todo = data.splice(i, 1)[0]; //获取到数组中的一个软塑
		// console.log(todo);
		todo[key] = value; // 重新赋值，修改状态
		data.splice(i, 0, todo); // 添加回原数组
		saveData(data);
		load(); // 数据刷新
	}

	$('#todolist').on('click', 'p', function(){
		let i = parseInt($(this).attr('index'));
		let title = $(this).html();
		// console.log($(this).parent()); 获取的是父级的li标签
		$(this).html(`
			<input type="text" id='input-${i}' value='${title}'>
		`);
		
		$(`#input-${i}`)[0].setSelectionRange(0, $(`#input-${i}`).val().length);
		$(`#input-${i}`)[0].focus();
		
		// 失去焦点保持更改的数据
		$(`#input-${i}`).blur(function(){
			if($(this).val().length === 0){
				$(this).html(title);
				alert('输入不能为空!')
			}else{
				update(i, 'title', $(this).val())
			}
		})
	})

})