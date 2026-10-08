const btn=document.querySelector('.menu-btn');const nav=document.querySelector('.nav');btn.addEventListener('click',()=>nav.classList.toggle('open'));document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const enrollmentForm=document.getElementById('enrollmentForm');
if(enrollmentForm){
  enrollmentForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const nome=document.getElementById('nome').value.trim();
    const telefone=document.getElementById('telefone').value.trim();
    const curso=document.getElementById('curso').value;
    const message=document.getElementById('formMessage');

    if(!nome || !telefone || !curso){
      message.textContent='Por favor, preencha todos os campos.';
      return;
    }

    const KEY='phedneckAcademyInscricoes';
    const inscricoes=JSON.parse(localStorage.getItem(KEY)||'[]');
    inscricoes.unshift({
      id: String(Date.now()),
      data: new Date().toISOString(),
      nome, telefone, curso, estado:'Nova'
    });
    localStorage.setItem(KEY, JSON.stringify(inscricoes));

    const academyNumber='244972136558';
    const text=`INSCRIÇÃO — PHEDNECK ACADEMY%0A%0ANome: ${encodeURIComponent(nome)}%0ATelefone: ${encodeURIComponent(telefone)}%0ACurso pretendido: ${encodeURIComponent(curso)}%0A%0ASolicito informações sobre a inscrição e a próxima turma.`;
    message.textContent='A abrir o WhatsApp para enviar a sua inscrição...';
    window.open(`https://wa.me/${academyNumber}?text=${text}`,'_blank');
  });
}
