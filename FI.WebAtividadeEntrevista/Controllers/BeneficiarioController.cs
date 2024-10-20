using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;
using System.Text.RegularExpressions;
using WebAtividadeEntrevista.Utils;

namespace WebAtividadeEntrevista.Controllers
{ 
    public class BeneficiarioController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                string cpfApenasNumeros = Regex.Replace(model.CPF, "[^0-9]", "");

                if (!CpfValidator.Validator(cpfApenasNumeros))
                    return Json("CPF inválido, tente novamente!");

                try
                {
                    model.Id = bo.Incluir(new Beneficiario()
                    {
                        CPF = cpfApenasNumeros,
                        Nome = model.Nome,
                        IdCliente = model.IdCliente
                    });
                }
                catch (Exception ex)
                {
                    return Json(ex.Message);
                }

                return Json("Cadastro efetuado com sucesso, recarregue a lista de beneficiários!");
            }
        }

        [HttpPost]
        public JsonResult Atualizar(BeneficiarioModel model)
        {
            try
            {
                BoBeneficiario bo = new BoBeneficiario();
                Beneficiario updateBen = new Beneficiario();

                string cpfApenasNumeros = Regex.Replace(model.CPF, "[^0-9]", "");

                if (!CpfValidator.Validator(cpfApenasNumeros))
                    return Json("CPF inválido, tente novamente!");

                updateBen.Id = model.Id;
                updateBen.CPF = cpfApenasNumeros;
                updateBen.Nome = model.Nome;

                try
                {
                    bo.Alterar(updateBen);
                    return Json("Beneficiario atualizado com sucesso, recarregue a lista de beneficiários!");
                }
                catch (Exception ex)
                {
                    return Json(ex.Message);
                }
            } 
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        [HttpPost]
        public JsonResult Excluir(long id)
        {
            BoBeneficiario bo = new BoBeneficiario();
            bo.Excluir(id);
            return Json("Beneficiário excluido!");
        }

        [HttpPost]
        public JsonResult BeneficiarioList(long id)
        {
            try
            {
                List<Beneficiario> beneficiarios = new BoBeneficiario().Listar(id);
                return Json(beneficiarios.ToList());
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }
    }
}