const form = document.querySelector('.form'),
	formOne = document.getElementById('step-one'),
	formTwo = document.getElementById('step-two'),
	formThree = document.getElementById('step-three'),
	stepIndicator = document.querySelector('.stepper-container p'),
	stepButtonOne = document.getElementById('next-button-1'),
	stepButtonTwo = document.getElementById('next-button-2'),
	finishButton = document.getElementById('finish-button');

formTwo.style.display = 'none';
formThree.style.display = 'none';
formOne.classList.add('active');
stepIndicator.innerHTML = 'step 1 of 3';

function validateForm(formId) {
   
   let isValid = true;
	const form = document.getElementById(formId),
		fields = form.querySelectorAll('[required]'),
      checkboxes = form.querySelectorAll('input[type="checkbox"][name^="topic"]');


	if (checkboxes.length > 0 && !Array.from(checkboxes).some((cb) => cb.checked)) {
		alert('you must select a topic of interest');
		isValid = false;
	}

	for (const field of fields) {
		// console.log(field.name, field.validity.valid);
		if (!field.checkValidity()) {
			alert('You must fill all the required spaces');
			isValid = false;
			break;
		}
	}

	return isValid;
}

if (formOne.classList.contains('active')) {
	const stepBorderOne = document.getElementById('back-one'),
		stepOne = document.getElementById('stepone');

	stepOne.style.color = '#845EEE';
	stepBorderOne.style.opacity = '1';
}

stepButtonOne.addEventListener('click', (event) => {
	event.preventDefault();

	const stepBorderTwo = document.getElementById('back-two'),
		stepTwo = document.getElementById('steptwo');

	if (validateForm('step-one')) {
		formOne.style.display = 'none';
		formTwo.style.display = 'flex';
		formTwo.classList.add('active');
		stepTwo.style.color = '#845EEE';
		stepBorderTwo.style.opacity = '1';
		stepIndicator.innerHTML = 'step 2 of 3'; 
	}

   let name = document.querySelector('input[name="username"]').value;
   let email = document.querySelector('input[name="useremail"]').value;

   localStorage.setItem('formData', JSON.stringify({ name, email }));
	
});

window.onload = () => {
   document.querySelectorAll('input[type=checkbox]').forEach((checkbox) => {
      checkbox.addEventListener('change', () => {
         let selectedTopics = [];

         document.querySelectorAll('input[type=checkbox]:checked').forEach((cb) => {
            selectedTopics.push(cb.nextElementSibling.textContent.trim());
         });

         localStorage.setItem('Topics', JSON.stringify(selectedTopics));
      });
   });
};

stepButtonTwo.addEventListener('click', (event) => {
	event.preventDefault();

	const stepBorderThree = document.getElementById('back-three'),
		stepThree = document.getElementById('stepthree');

	if (validateForm('step-two')) {
		formOne.style.display = 'none';
		formTwo.style.display = 'none';
		formThree.style.display = 'flex';
		formThree.classList.add('active');
		stepThree.style.color = '#845EEE';
		stepBorderThree.style.opacity = '1';
		stepIndicator.innerHTML = 'step 3 of 3';
	}
   
   const storedData = JSON.parse(localStorage.getItem('formData'));
   if (storedData) {
      document.querySelector('.name').innerHTML += storedData.name ;
      document.querySelector('.email').innerHTML += storedData.email ;
   }

   const selectedTopics = JSON.parse(localStorage.getItem('Topics'));
   if (selectedTopics && selectedTopics.length > 0) {
      selectedTopics.forEach(topic => {
         let listItem = document.createElement('li');
         listItem.classList.add('topic-item');
         listItem.textContent = topic;
         document.querySelector('.summary-list').appendChild(listItem);
      });
   }
});

finishButton.addEventListener('click', ()=>{
	alert('✅ Success');
})