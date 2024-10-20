
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);
    }

    document.getElementById('CPF').addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length >= 3) {
            value = value.replace(/^(\d{3})(\d)/, '$1.$2');
        }
        if (value.length >= 6) {
            value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        }
        if (value.length >= 9) {
            value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        }

        e.target.value = value;
    });

    

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val(),
                "CPF": $(this).find("#CPF").val()
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
            function (r) {
                ModalDialog("Sucesso", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                            ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

$("#novoBeneficiario").click(function () {
    $.ajax({
        url: urlBeneficiarioList,
        method: "POST",
        data: {
            "id": window.location.pathname.split("/").pop()
        },
        success:
            function (list) {
                modalCreate(list)
            }
    });
})

function postBen(data) {
    $.ajax({
        url: urlPostModal,
        method: "POST",
        data: {
            "idcliente": window.location.pathname.split("/").pop(),
            "cpf": data.CPF,
            "nome": data.Nome
        },
        error: function(r) {
            ModalDialog("Erro", r.responseJSON);
        },
        success: function (r) {
            ModalDialog("Sucesso", r);
        }
    });
}

function deleteBen(id) {
    $.ajax({
        url: urlExcluirBeneficiario,
        method: "POST",
        data: {
            "id": id
        },
        error: function (r) {
            ModalDialog("Erro", r);
        },
        success: function (r) {
            $('#trBen_' + id).remove();
        }
    });
}

function updateBen(data) {
    $.ajax({
        url: urlAtualizarBeneficiario,
        method: "POST",
        data: {
            "id": data.Id,
            "cpf": data.CPF,
            "nome": data.Nome
        },
        error: function (r) {
            ModalDialog("Erro", r.responseJSON);
        },
        success: function (r) {
            ModalDialog("Sucesso", r);
        }
    });
}

function modalCreate(list) {
    //Input
    var element = '<form id="formBeneficiario" style="margin-bottom: 30px; method="POST">                                  ' +
        '    <div class="row">                                                                                             ' +
        '        <div class="col-md-5">                                                                                    ' +
        '            <div class="form-group">                                                                              ' +
        '                <label for="CPF_Ben">CPF:</label>                                                                 ' +
        '                <input required="required" type="text" class="form-control" id="CPF_Ben" name="CPF_Ben"           ' +
        '                       placeholder="Ex.: 010.011.111-00" maxlength="14">                                          ' +
        '            </div>                                                                                                ' +
        '        </div>                                                                                                    ' +
        '        <div class="col-md-5">                                                                                    ' +
        '            <div class="form-group">                                                                              ' +
        '                <label for="Nome_Ben">Nome:</label>                                                               ' +
        '                <input required="required" type="text" class="form-control" id="Nome_Ben" name="Nome_Ben"         ' +
        '                       placeholder="Ex.: João" maxlength="50">                                                    ' +
        '            </div>                                                                                                ' +
        '        </div>                                                                                                    ' +
        '        <div class="col-md-2">                                                                                    ' +
        '            <div class="form-group">                                                                              ' +
        '               </br>                                                                                              ' +
        '               <button type="submit" class="form-control btn btn-sm btn-success">Incluir</button>                 ' +
        '            </div>                                                                                                ' +
        '        </div>                                                                                                    ' +
        '    </div>                                                                                                        ' +
        '</form>';


    var cpfValue;
    var nameValue;
    var dataBen;

    $(document).off('submit', '#formBeneficiario').on('submit', '#formBeneficiario', function (event) {
        event.preventDefault();
        cpfValue = $('#CPF_Ben').val();
        nameValue = $('#Nome_Ben').val();
        dataBen = { CPF: cpfValue, Nome: nameValue };
        this.reset();
        postBen(dataBen);
    });

    element += '<table class="table table-sm">                                                                                     ' +
        '    <thead>                                                                                                               ' +
        '        <tr>                                                                                                              ' +
        '            <th>CPF</th>                                                                                                  ' +
        '            <th>Nome</th>                                                                                                 ' +
        '            <th width="160px;">Ações</th>                                                                                                ' +
        '        </tr>                                                                                                             ' +
        '    </thead>                                                                                                              ' +
        '    <tbody>                                                                                                               ';

    //Data
    list.forEach(function (ben) {
        element += '<tr id="trBen_' + ben.Id + '">' +
            '           <td><input required="required" type="text" class="form-control form-control-sm" id="" name="" value="' + ben.CPF + '" placeholder="' + ben.CPF + '"></td>'   +
            '           <td><input required="required" type="text" class="form-control form-control-sm" id="" name="" value="' + ben.Nome + '" placeholder="' + ben.Nome + '"></td>' +
            '           <td>'                                                                                                                                                        +
            '               <button type="button" class="btn btn-sm btn-info" id="' + ben.Id + '">Atualizar</button>'                                                                +
            '               <button type="button" class="btn btn-sm btn-danger" id="' + ben.Id + '">Remover</button'                                                                 +
            '           </td>' +
            '       </tr>';

    });

    $(document).off('click', '.btn-danger').on('click', '.btn-danger', function (event) {
        event.preventDefault();
        var id = $(this).attr('id');
        deleteBen(id);
    });

    var id;
    var row;
    var cpf;
    var nome;

    $(document).off('click', '.btn-info').on('click', '.btn-info', function (event) {
        event.preventDefault();
        id = $(this).attr('id');
        row = $('#trBen_' + id);
        cpf = row.find('input').eq(0).val();
        nome = row.find('input').eq(1).val();
        var dataBen = { Id: id, CPF: cpf, Nome: nome };
        row.find('input').eq(0).val(cpf);
        row.find('input').eq(1).val(nome);
        updateBen(dataBen);
    });

    element += '</tbody></table>';

    ModalDialog("Beneficiários", element)
}