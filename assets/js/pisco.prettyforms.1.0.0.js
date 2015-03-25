jQuery.fn.piscoPrettyForms = function(options) {
	
	var defaults = {
		className: 'prettyForm',
		selectWidth: 'auto',
		customClass: 'default'
	}
	
	options = $.extend(defaults, options);
	
	$(this).each(function() {
	
		var $this = $(this);
		
		// determine type of form element:
		
		var elementType = $this.get(0).tagName;
		
		switch(elementType) {
		
			// is a select:
			case 'SELECT':
			
				// title on span:
				
				var title = $this.data('title');
				if(!title) title = $this.children('option:first-child').text();
				
				$this.find('option[data-first="title"]').remove();
				
				$this.addClass('prettyFormHide').before('<span class="prettyFormSelect">' + title + '</span>');
				
				var $prevSpanTitle = $this.prev('span.prettyFormSelect');
				
				// options, sizes, clases etc:
				
				if(options.customClass!='default'){
					$prevSpanTitle.addClass(options.customClass);
				} else {
					if(!options.selectWidth) {
						var selectWidth = $this.outerWidth();
						$prevSpanTitle.width(selectWidth);
					} else {
						$prevSpanTitle.width(options.selectWidth);
					}
				}
				
				$this.height($prevSpanTitle.outerHeight()).width($prevSpanTitle.outerWidth());
				
				//change title with options selected:
				
				$this.change(function(){
					title = $('option:selected',this).text();
					$this.prev('span.prettyFormSelect').text(title);
				});
				
				break;
				
			// is an input:
			case 'INPUT':
				
				//get type of input:
				var inputType = $this.attr('type');
				var $thisPrettyLabel;
				switch(inputType) {
				
					// is a radio button:
					case 'radio':
					
						$this.addClass('prettyFormHide').before('<span class="prettyFormRadio"></span>');
						var $thisPrettyRadio = $this.prev('span.prettyFormRadio');
						$thisPrettyLabel = $this.next('label');
						
						if(options.customClass!='default') $thisPrettyRadio.addClass(options.customClass);
					
						if($this.is(':checked')) $thisPrettyRadio.addClass('on');
						
						$thisPrettyRadio.click(function(e){
							radioClick($(this));
							e.preventDefault();
						});
						
						$thisPrettyLabel.click(function(e){
							radioClick($(this));
							e.preventDefault();
						});
					
						break;
						
					//is a checkbox:
					case 'checkbox':
					
						$this.addClass('prettyFormHide').before('<span class="prettyFormCheckbox"></span>');
						var $thisPrettyCheckbox = $this.prev('span.prettyFormCheckbox');
						$thisPrettyLabel = $this.next('label');
						
						if(options.customClass!='default') $thisPrettyCheckbox.addClass(options.customClass);
						
						if($this.is(':checked')) $thisPrettyCheckbox.addClass('on');
						
						$thisPrettyCheckbox.click(function(e){
							checkboxClick($(this));
							e.preventDefault();
						});
						
						$thisPrettyLabel.click(function(e){
							checkboxClick($(this));
							e.preventDefault();
						});
					
						break;
				
				}
				
				break;
			
		} //switch	
		
		
	});
	
	var radioClick = function($this){
		var $itsRadio;
		if($this.get(0).tagName == 'SPAN') {
			$itsRadio = $this.next('input');			
		} else if($this.get(0).tagName == 'LABEL') {
			$itsRadio = $this.prev('input');
		} else {
			return;
		}
		
		var familyName = $itsRadio.attr('name');
		var brothers = $('input[name="' + familyName + '"]').prev('span.prettyFormRadio');
		
		if($itsRadio.not(':checked')){
			$itsRadio.prop('checked',true).trigger("change");
			brothers.removeClass('on');
			$itsRadio.prev('span').addClass('on');
		} else {
			$itsRadio.prop('checked',false).trigger("change");
		}
		
	};
	
	var checkboxClick = function($this){
		var $itsCheckbox;
		if($this.get(0).tagName == 'SPAN') {
			$itsCheckbox = $this.next('input');			
		} else if($this.get(0).tagName == 'LABEL') {
			$itsCheckbox = $this.prev('input');
		} else {
			return;
		}
		
		if($itsCheckbox.is(':checked')) {
			$itsCheckbox.prop('checked',false).trigger("change");
			$itsCheckbox.prev('span').removeClass('on');
		} else {
			$itsCheckbox.prop('checked',true).trigger("change");
			$itsCheckbox.prev('span').addClass('on');
		}
		
	};
	
}
