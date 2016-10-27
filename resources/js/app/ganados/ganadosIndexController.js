(function() {
    'use strict';

    var tablaActual = null;
    try{
        tablaActual = $("#ganados-main-table").DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "info": true,
            "autoWidth": false
            //"responsive": false
        });
    }
    catch (e){
        console.log("Error [Ganados/Index/Controller]:", e.message);
    }

    /**
     *
     * @param timestamp
     * @returns {string}
     */
    function getFecha(timestamp){
        var a = new Date(timestamp * 1000);
        var months = ['Ene','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = "0" + a.getMonth();
        var date = "0" + a.getDate();

        var time = date.substr(-2) + '/' + month.substr(-2) + '/' + year;
        return time;
    }

    getList(R_FAMILIA_INDEX + '/PRU-1986/index.json')
        .done(function(response) {
            // validateSession(data);
            // $.each(data.resumen, function(i, item) {
            //     $('#ganados-resumen-tipo-' + item.id).html(item.cantidad);
            // });
            //
            $.each(response.data, function(i, item) {
                if (tablaActual != null){
                    tablaActual.row.add( [
                        (i+1),
                        item.id,
                        item.nombre,
                        item.integrantes
                        // '<a id="persona_' + item.id + '" name="lista_editar" href="javascript:loadModule(\'ganados\',\'ganados\',\'Editar\',' + item.id + ');">' + item.nombres + '</a>',
                        // item.telefono,
                        // item.correo,
                        // item.metodoGanar.nombre,
                        // getFecha(item.fechaGanado.timestamp),
                    ] ).draw( false );
                }
            });
        })
        .fail(function(dataFail) {
        })
        .always(function() {
            $( "#table-loader" ).remove();
        });

    
})();