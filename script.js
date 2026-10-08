const btn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

if (btn && nav) {
  btn.addEventListener('click', () => nav.classList.toggle('open'));

  document.querySelectorAll('.nav a').forEach(a => {
    a.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const SUPABASE_URL = 'https://bakjvmodzpkqlqyydauu.supabase.co';
const SUPABASE_KEY = 'sb_publishable_cPHr2O1STHu4O9qnN1dJEA_4JQ6uENq';

const enrollmentForm = document.getElementById('enrollmentForm');

if (enrollmentForm) {
  enrollmentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const curso = document.getElementById('curso').value;
    const message = document.getElementById('formMessage');

    if (!nome || !telefone || !curso) {
      message.textContent = 'Por favor, preencha todos os campos.';
      return;
    }

    message.textContent = 'A guardar a sua inscrição...';

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/inscricoes`,
        {
          method: 'POST',
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal'
          },
          body: JSON.stringify({
            nome: nome,
            telefone: telefone,
            Curso: curso,
            Estado: 'Pendente'
          })
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const academyNumber = '244972136558';

      const text =
        `INSCRIÇÃO — PHEDNECK ACADEMY\n\n` +
        `Nome: ${nome}\n` +
        `Telefone: ${telefone}\n` +
        `Curso pretendido: ${curso}\n\n` +
        `Solicito informações sobre a inscrição e a próxima turma.`;

      message.textContent =
        'Inscrição realizada com sucesso! A abrir o WhatsApp...';

      window.open(
        `https://wa.me/${academyNumber}?text=${encodeURIComponent(text)}`,
        '_blank'
      );

      enrollmentForm.reset();

    } catch (error) {
      console.error('Erro ao guardar inscrição:', error);

      message.textContent =
        'Não foi possível guardar a inscrição. Tente novamente.';
    }
  });
}